import { createAction } from 'redux-actions';
import api from '../api/Api';

import { UPDATE_CURRENT_EVENT, UPDATE_USER_EVENT_DATA, EVENT_DATA_LOADING, RESET_EVENT_DATA, 
         EVENT_DATA_DONE_LOADING, USER_EVENT_DATA_LOADING, USER_EVENT_DATA_DONE_LOADING,
        ADD_EVENT_TO_EVENT_LIST, REMOVE_EVENT_FROM_EVENT_LIST, UPDATE_EVENT_IN_EVENT_LIST,
        UPDATE_USER_EVENT_ACCESS} from './actionTypes';

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
        dispatch(userEventDataLoading());
    }
}

 /**
 * Subscribe to data specific to a user or event or a combination.
 * @param {function} dispatch - Redux dispatch function
 * @param {string} uid - Firebase.Auth UserID
 * @param {string} lastVisitedEvent - The event that is currently selected by the user.
 */
export function setupEventUserDataHooks(uid, currentEvent) {
    return dispatch => {

        api.user.setLastVisitedEvent(uid, currentEvent);
        api.events.subscribeToEvent(currentEvent, event => {
            dispatch(updateCurrentEventAsync(event));
        });
        
        api.events.subscribeToEventAccessStatus(uid, currentEvent, status => {
            if(status) {
                dispatch(updateUserEventAccess(true));
                dispatch(userEventDataLoading());
                api.events.subscribeToUserEventData(currentEvent, uid, data => {
                    dispatch(updateUserEventDataAsync(data));
                });
            } else {
                dispatch(updateUserEventAccess(false));
                dispatch(userEventDataDoneLoading());
                api.events.clearEventUserSubscriptions();
            }
        })
    }
}

 /**
 * Update the current event and signal that the event has been loaded.
 * @param {object} event - The event object which will be used as the current event.
 */
function updateCurrentEventAsync(event) {
    return (dispatch, getState) => {
        dispatch(updateCurrentEvent(event))
        let loading = getState().event.event.get('eventDataLoading');
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
        let loading = getState().event.event.get('userEventDataLoading');
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
    }
}