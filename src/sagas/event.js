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


/**
 * Function describing the flow of actions taken in order to request access to an event.
 */
function* requestEventAccessFlow() {
    while(true) {
        //Catch the REQUEST_EVENT_ACCESS action.
        let accesReq = yield take(REQUEST_EVENT_ACCESS);
        //Grab the userId and eventId from the payload.
        let { uid, eventId } = accesReq.payload;
        //Request access to an event.
        api.events.requestEventAccess(uid, eventId);
    }
}

/**
 * Function handling a subscription to a user's event access request.
 */
function* subscribeToEventList() {
    //Create a channel to listen for new and updated events.
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

/**
 * Function describing the flow of actions taken in order to initialize and load the event list.
 */
function* eventListFlow() {
     while(true) {
        //Catch the INITIALIZE_EVENT_LIST action.
        yield take(INITIALIZE_EVENT_LIST);
        //Start the loader.
        yield put(eventDataLoading());
        //Mark the page as a page the user can navigate back to.
        yield put(updateCanGoBack(true));
        //Subsribe to events.
        const eventListTask = yield fork(subscribeToEventList);
        //Load all events seperately to sync when the loader should stop.
        yield call(api.events.getEvents);
        //Stop the loader when the events have all been retrived.
        yield put(eventDataDoneLoading());
        //Start the cleanup process.
        yield take(CLEANUP_EVENT_LIST);
        yield cancel(eventListTask);
    }
}

/**
 * Function handling a subscription to a user's event access request.
 */
function* subscribeToEventAccessRequest(eventId, userId) {
    //Create a channel to listen to the request status updates.
    let eventAccessRequestChan = yield call(createEventAccessRequestChannel, eventId, userId);
    try {
        while(true) {
            //Get the new status.
            let requestStatus = yield take(eventAccessRequestChan);
            yield put(requestStatus);
        }
    } finally {
         if (yield cancelled()) {
            eventAccessRequestChan.close();
        }
    }
}


function* subscribeToUserEventData(eventId, userId) {
    //Create a channel to listen for user event data updates.
    let userEventDataChan = yield call(createUserEventDataChannel, eventId, userId);
    try {
        while(true) {
            //Grab an update.
            let data = yield take(userEventDataChan);
            //Update the user data.
            if(data) {
                yield put(updateUserEventData(data));
            }
            //Stop the loader.
            yield put(userEventDataDoneLoading());
        }
    } finally {
        if (yield cancelled()) {
            userEventDataChan.close();
        }
    }
}

/**
 * Function describing the flow of actions taken in order to synchronize the user event data.
 */
function* userEventDataFlow() {
    while(true) {
        //Catch the INITIALIZE_USER_EVENT_DATA action.
        let { payload } = yield take(INITIALIZE_USER_EVENT_DATA);
        //Subscribe to user event data.
        let userEventDataTask = yield fork(subscribeToUserEventData, payload.eventId, payload.userId);
        //Start the cleanup process.
        yield take(CLEANUP_USER_EVENT_DATA);
        yield cancel(userEventDataTask);
    } 
}

/**
 * Function handling subscriptions related to a user's access to an event.
 */
function* subscribeToEventAccess(eventId, userId) {
    //Create a channel to listen for user access updates.
    let accessChan = yield call(createUserAccessChannel, eventId, userId)
    try {
        while (true) {
            //Grab an update from the channel.
            let access = yield take(accessChan);
            //If a user has access.
            if(access) {
                //Update the user's access status for the current event.
                yield put(updateUserEventAccess(true));
                //Start the user event data flow 
                yield put({type: INITIALIZE_USER_EVENT_DATA, payload: {eventId, userId}});
            } else {
                //If the user does not have access.
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


/**
 * Function describing the flow of actions taken to handle user privileges for an event.
 */
function* userAccessFlow() {
    while(true) {
        //Catch the INITIALIZE_USER_ACCESS action.
        let { payload } = yield take(INITIALIZE_USER_ACCESS);
        //Get the currently signed in user if any.
        let user = yield call(api.auth.getCurrentUser);
        //If a user is signed in.
        if (user) {
            //Start the loader for userEventData.
            yield put(userEventDataLoading());
            //Subscribe to the user access status.
            let accessTask = yield fork(subscribeToEventAccess, payload, user.uid);
            //Subscribe to the status of a potential access request.
            //This is used to control what the user can see if the user interface for the event.
            let accessRequestTask = yield fork(subscribeToEventAccessRequest, payload, user.uid);
            //Start the cleanup process.
            yield take(CLEANUP_USER_ACCESS);
            yield cancel(accessTask);
            yield cancel(accessRequestTask);
        }
    } 
}

/**
 * Function handling subscriptions for an event.
 */
function* subscribeToEvent(eventId) {
    //Initialize the store.
    yield put({type: INIT_STORE, payload: eventId});
    //Initialize the user access flow..
    yield put({type: INITIALIZE_USER_ACCESS, payload: eventId});
    //Create a channel to listen for updates to the event.
    const eventChan = yield call(createEventChannel, eventId);
    try {
        while (true) {
            //Wait for an update to the event.
            let action = yield take(eventChan);
            //Update the event.
            yield put(updateCurrentEvent(action));
            //Stop the loader.
            yield put(eventDataDoneLoading());
        }
    } finally {
        //If the task was cancelled.
        if (yield cancelled()) {
            //Cleanup all event data and close the event channel.
            yield put({type: CLEANUP_STORE});
            yield put({type: CLEANUP_USER_ACCESS});
            eventChan.close();
        }
    }
}

/**
 * Function describing the flow of actions taken when an event is loaded.
 */
function* eventFlow() {
    while(true) {
        //Catch the INITIALIZE_EVENT action
        let { payload } = yield take(INITIALIZE_EVENT);
        //Reset the menu.
        yield put(resetMenu());
        //Start the loader
        yield put(eventDataLoading());
        //Mark the page as a page the user can navigate back to.
        yield put(updateCanGoBack(true));
        //Subscribe to data for the event.
        const eventTask = yield fork(subscribeToEvent, payload);
        
        //Start the cleanup process.
        yield take(CLEANUP_EVENT);
        yield cancel(eventTask);
        yield put({type: RESET_EVENT_DATA});
    }
}

/**
 * Kick off the different flows.
 */

export default function* eventRoot() {
    yield fork(eventFlow);
    yield fork(userAccessFlow);
    yield fork(userEventDataFlow);
    yield fork(eventListFlow);
    yield fork(requestEventAccessFlow);
}

