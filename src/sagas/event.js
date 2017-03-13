import { eventChannel, buffers } from 'redux-saga';
import { fork, take, call, put, cancel, cancelled } from 'redux-saga/effects';
import api from 'api/Api';
import { 
    INITIALIZE_EVENT, 
    CLEANUP_EVENT,
    INITIALIZE_USER_ACCESS,
    CLEANUP_USER_ACCESS,
    INITIALIZE_USER_EVENT_DATA,
    CLEANUP_USER_EVENT_DATA, 
    RESET_EVENT_DATA, 
    INIT_STORE, 
    CLEANUP_STORE 
} from 'actions/actionTypes';

import {eventDataDoneLoading, updateCurrentEvent, 
        eventDataLoading, updateUserEventAccess,
        userEventDataLoading, userEventDataDoneLoading, 
        updateUserEventData,} from 'actions/event';
import { resetMenu } from 'actions/eventmenu';
import { updateCanGoBack } from 'actions/app';

export default function* eventRoot() {
    yield fork(eventFlow);
    yield fork(userAccessFlow);
    yield fork(userEventDataFlow);
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

function* subscribeToEvent(eventId) {
    yield put({type: INIT_STORE, payload: eventId});
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

function* userAccessFlow() {
    while(true) {
        let { payload } = yield take(INITIALIZE_USER_ACCESS);
        let user = yield call(api.auth.getCurrentUser);
        if (user) {
            yield put(userEventDataLoading());
            let accessTask = yield fork(subscribeToEventAccess, payload, user.uid);
            yield take(CLEANUP_USER_ACCESS);
            yield cancel(accessTask);
        }
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

function* userEventDataFlow() {
    while(true) {
        let { payload } = yield take(INITIALIZE_USER_EVENT_DATA);
        let userEventDataTask = yield fork(subscribeToUserData, payload.eventId, payload.userId);
        yield take(CLEANUP_USER_EVENT_DATA);
        yield cancel(userEventDataTask);
        //TODO: Remove userEventData.
    } 
}

function* subscribeToUserData(eventId, userId) {
    let userEventDataChan = yield call(createUserEventDataChannel, eventId, userId);
    try {
        while(true) {
            let data = yield take(userEventDataChan);
            yield put(updateUserEventData(data));
            yield put(userEventDataDoneLoading());
        }
    } finally {
        if (yield cancelled()) {
            userEventDataChan.close();
        }
    }
}

function createUserEventDataChannel(eventId, userId) {
    return eventChannel(emit => {

        const handler = data => {
            emit(data);
        }

        let ref = api.events.subscribeToUserEventData(eventId, userId, handler);
        
        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;
    }, buffers.fixed(1));
}


function createUserAccessChannel(eventId, userId) {
    return eventChannel(emit => {
        const handler = status => {
            emit(status);
        }

        let ref = api.events.subscribeToEventAccessStatus(userId, eventId, handler);
        
        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;

    },buffers.fixed(1));
}


function createEventChannel(eventId) {
    return eventChannel(emit => {

        const handler = event => {
            emit(event);
        };

        let ref = api.events.subscribeToEvent(eventId, handler);

        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;
    }, buffers.fixed(1));
} 





