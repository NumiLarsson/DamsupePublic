import { createAction } from 'redux-actions';
import api from '../api/Api';

import {INITIALIZE_EVENT, CLEANUP_EVENT, UPDATE_CURRENT_EVENT, UPDATE_USER_EVENT_DATA, EVENT_DATA_LOADING, RESET_EVENT_DATA, 
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

export const eventDataLoading = createAction(EVENT_DATA_LOADING);
export const eventDataDoneLoading = createAction(EVENT_DATA_DONE_LOADING);
export const userEventDataLoading = createAction(USER_EVENT_DATA_LOADING);
export const userEventDataDoneLoading = createAction(USER_EVENT_DATA_DONE_LOADING);

export const initializeEvent = createAction(INITIALIZE_EVENT);
export const cleanupEvent = createAction(CLEANUP_EVENT);

 /**
 * Mark event as loading.
 */
export function eventLoading() {
    return dispatch => {
        dispatch(eventDataLoading());
    }
}


/**
 * unsubscribe to the event list.
 */
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