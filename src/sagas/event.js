import { fork, take, call, put, cancel, cancelled } from 'redux-saga/effects';
import api from 'api/Api';
import { 
    INITIALIZE_EVENT, 
    CLEANUP_EVENT,
    INITIALIZE_USER_ACCESS,
    CLEANUP_USER_ACCESS,
    INITIALIZE_USER_EVENT_DATA,
    CLEANUP_USER_EVENT_DATA, 
    INITIALIZE_EVENT_LIST,
    CLEANUP_EVENT_LIST,
    RESET_EVENT_DATA, 
    INIT_STORE, 
    CLEANUP_STORE,
    REQUEST_EVENT_ACCESS 
} from 'actions/actionTypes';

import {eventDataDoneLoading, updateCurrentEvent, 
        eventDataLoading, updateUserEventAccess,
        userEventDataLoading, userEventDataDoneLoading, 
        updateUserEventData} from 'actions/event';
import { resetMenu } from 'actions/eventmenu';
import { updateCanGoBack } from 'actions/app';
import {createUserEventDataChannel, createUserAccessChannel, 
        createEventChannel, createEventListChannel, createEventAccessRequestChannel } from './channels';


function* requestEventAccessFlow() {
    while(true) {
        let accesReq = yield take(REQUEST_EVENT_ACCESS);
        let { uid, eventId } = accesReq.payload;
        api.events.requestEventAccess(uid, eventId);
    }
}


function* subscribeToEventList() {
    const chan = yield call(createEventListChannel);
    try {
        while (true) {
            let action = yield take(chan);
            yield put(action);
        }
    } finally {
        if (yield cancelled()) {
            chan.close();
        }
    }
}

function* eventListFlow() {
     while(true) {
        yield take(INITIALIZE_EVENT_LIST);
        yield put(eventDataLoading());
        yield put(updateCanGoBack(true));
        const eventListTask = yield fork(subscribeToEventList);
        yield call(api.events.getEvents);
        yield put(eventDataDoneLoading());
        yield take(CLEANUP_EVENT_LIST);
        yield cancel(eventListTask);
    }
}

function* subscribeToUserEventData(eventId, userId) {
    let userEventDataChan = yield call(createUserEventDataChannel, eventId, userId);
    try {
        while(true) {
            let data = yield take(userEventDataChan);
            if(data) {
                yield put(updateUserEventData(data));
            }
            yield put(userEventDataDoneLoading());
        }
    } finally {
        if (yield cancelled()) {
            userEventDataChan.close();
        }
    }
}

function* userEventDataFlow() {
    while(true) {
        let { payload } = yield take(INITIALIZE_USER_EVENT_DATA);
        let userEventDataTask = yield fork(subscribeToUserEventData, payload.eventId, payload.userId);
        yield take(CLEANUP_USER_EVENT_DATA);
        yield cancel(userEventDataTask);
    } 
}

function* subscribeToEventAccess(eventId, userId) {
    let accessChan = yield call(createUserAccessChannel, eventId, userId)
    try {
        while (true) {
            let status = yield take(accessChan);
            if(status) {
                yield put(updateUserEventAccess(true));
                yield put({type: INITIALIZE_USER_EVENT_DATA, payload: {eventId, userId}});
            } else {
                yield put(updateUserEventAccess(false));
                yield put(userEventDataDoneLoading());
                yield put({type: CLEANUP_USER_EVENT_DATA});
            }
        }
    } finally {
         if (yield cancelled()) {
            accessChan.close();
            yield put({type: CLEANUP_USER_EVENT_DATA});
        }
    }
}

function* subscribeToEventAccessRequest(eventId, userId) {
    let eventAccessChan = yield call(createEventAccessRequestChannel, eventId, userId);
    try {
        while(true) {
            let requestStatus = yield take(eventAccessChan);
            yield put(requestStatus);
        }
    } finally {
         if (yield cancelled()) {
            eventAccessChan.close();
        }
    }
}


function* userAccessFlow() {
    while(true) {
        let { payload } = yield take(INITIALIZE_USER_ACCESS);
        let user = yield call(api.auth.getCurrentUser);
        if (user) {
            yield put(userEventDataLoading());
            let accessTask = yield fork(subscribeToEventAccess, payload, user.uid);
            let accessRequestTask = yield fork(subscribeToEventAccessRequest, payload, user.uid);
            yield take(CLEANUP_USER_ACCESS);
            yield cancel(accessTask);
            yield cancel(accessRequestTask);
        }
    } 
}

function* subscribeToEvent(eventId) {
    yield put({type: INIT_STORE, payload: eventId});
    let user = yield call(api.auth.getCurrentUser);
    yield put({type: INITIALIZE_USER_ACCESS, payload: eventId});
    const eventChan = yield call(createEventChannel, eventId);
    try {
        while (true) {
            let action = yield take(eventChan);
            yield put(updateCurrentEvent(action));
            yield put(eventDataDoneLoading());
        }
    } finally {
        if (yield cancelled()) {
            yield put({type: CLEANUP_STORE});
            yield put({type: CLEANUP_USER_ACCESS});
            eventChan.close();
        }
    }
}

function* eventFlow() {
    while(true) {
        let { payload } = yield take(INITIALIZE_EVENT);
        yield put(resetMenu());
        yield put(eventDataLoading());
        yield put(updateCanGoBack(true));
        const eventTask = yield fork(subscribeToEvent, payload);
        yield take(CLEANUP_EVENT);
        yield cancel(eventTask);
        yield put({type: RESET_EVENT_DATA});
    }
}

export default function* eventRoot() {
    yield fork(eventFlow);
    yield fork(userAccessFlow);
    yield fork(userEventDataFlow);
    yield fork(eventListFlow);
    yield fork(requestEventAccessFlow);
}

