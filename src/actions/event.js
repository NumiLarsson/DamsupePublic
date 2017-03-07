import { createAction } from 'redux-actions';
import api from '../api/Api';

import { UPDATE_CURRENT_EVENT, UPDATE_USER_EVENT_DATA, EVENT_DATA_LOADING, RESET_EVENT_DATA, 
         EVENT_DATA_DONE_LOADING, USER_EVENT_DATA_LOADING, USER_EVENT_DATA_DONE_LOADING,
        ADD_EVENT_TO_EVENT_LIST, REMOVE_EVENT_FROM_EVENT_LIST, UPDATE_EVENT_IN_EVENT_LIST,
        UPDATE_USER_EVENT_ACCESS} from './actionTypes';
import { setupEventStoreDataHooks } from './store';

export const addEventToEventList = createAction(ADD_EVENT_TO_EVENT_LIST);
export const removeEventFromEventList = createAction(REMOVE_EVENT_FROM_EVENT_LIST);
export const updateEventInEventList = createAction(UPDATE_EVENT_IN_EVENT_LIST);

export const updateUserEventAccess = createAction(UPDATE_USER_EVENT_ACCESS);
export const updateCurrentEvent = createAction(UPDATE_CURRENT_EVENT);
export const updateUserEventData = createAction(UPDATE_USER_EVENT_DATA);
export const resetEventData = createAction(RESET_EVENT_DATA);

const eventDataLoading = createAction(EVENT_DATA_LOADING);
const eventDataDoneLoading = createAction(EVENT_DATA_DONE_LOADING);
const userEventDataLoading = createAction(USER_EVENT_DATA_LOADING);
const userEventDataDoneLoading = createAction(USER_EVENT_DATA_DONE_LOADING);


 /**
 * Mark event as loading.
 */
export function eventLoading() {
    return dispatch => {
        dispatch(eventDataLoading());
    }
}


function setupEventDataHooks(eventId) {
    return (dispatch) => {
        api.events.subscribeToEvent(eventId, event => {
            dispatch(updateCurrentEventAsync(event));
        });
        dispatch(setupEventStoreDataHooks(eventId));
    }
} 

function setupUserDataHooks(uid, eventId) {
    return (dispatch) => {
        api.user.setLastVisitedEvent(uid, eventId);
        dispatch(userEventDataLoading());
        api.events.subscribeToUserEventData(eventId, uid, data => {
            dispatch(updateUserEventDataAsync(data));
        });
    }
}

export function subscribeToUserEventAccess(uid, eventId) {
    return (dispatch) => {
        api.events.subscribeToEventAccessStatus(uid, eventId, status => {
            if(status) {
                dispatch(updateUserEventAccess(true));
                dispatch(setupUserDataHooks(uid, eventId));
            } else {
                dispatch(updateUserEventAccess(false));
                dispatch(userEventDataDoneLoading());
                api.events.clearEventUserSubscriptions();
            }
        });
    }
}

 /**
 * Subscribe to event data.
 * @param {function} eventId - Id of the event.
 */
export function setupEventUserDataHooks(eventId) {
    return (dispatch, getState) => {

        dispatch(setupEventDataHooks(eventId));

        let user = api.auth.getCurrentUser();
        if (user) {
            dispatch(subscribeToUserEventAccess(user.uid, eventId));
        }
        
        /*
        const auth = getState().auth;
        const signedIn = auth.get('authenticated');
        if(signedIn) {
            const uid = auth.get('uid');
            
        }
        */
    }
}

 /**
 * Update the current event and signal that the event has been loaded.
 * @param {object} event - The event object which will be used as the current event.
 */
function updateCurrentEventAsync(event) {
    return (dispatch, getState) => {
        dispatch(updateCurrentEvent(event))
        let loading = getState().event.event.get('loading');
        if (loading) {
            dispatch(eventDataDoneLoading());
        }
    }
}

 /**
 * Update the current event data and signal that the event data has been loaded.
 * @param {object} event - The event data object which will be used as the current event data object.
 */
function updateUserEventDataAsync(data) {
     return (dispatch, getState) => {
        dispatch(updateUserEventData(data))
        let loading = getState().event.userdata.get('loading');
        if (loading) {
            dispatch(userEventDataDoneLoading());
        }
    }
}

/**
 * unsubscribe to all event and event/user updates.
 */
export function unsubscribeToEvent() {
    return dispatch => {
        api.events.clearEventUserAccessSubscriptions();
        api.events.clearEventUserSubscriptions();
        api.events.clearEventSubscriptions();
    } 
}

export function unsubscribeToEventList() {
    return dispatch => {
        api.events.unsubScribeToEvents();
    }
}


/**
* Subscribe to a list of all events
*/
export function setupEventListSubscription() {
    return dispatch => {
        api.events.subscribeToEvents(
            event => dispatch(addEventToEventList(event)),
            event => dispatch(updateEventInEventList(event)),
            event => dispatch(removeEventFromEventList(event)),
        )
        api.events.getEvents()
        .then(() => {
            dispatch(eventDataDoneLoading());
        })
    }
}