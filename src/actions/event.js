import { createAction } from 'redux-actions';
import api from '../api/Api';

import { UPDATE_CURRENT_EVENT, UPDATE_USER_EVENT_DATA, EVENT_DATA_LOADING, RESET_EVENT_DATA, 
         EVENT_DATA_DONE_LOADING, USER_EVENT_DATA_LOADING, USER_EVENT_DATA_DONE_LOADING} from './actionTypes';

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
export function setupEventUserDataHooks(dispatch, uid, lastVisitedEvent) {
    api.events.clearSubscriptions();
    api.events.subscribeToEvent(lastVisitedEvent, (event) => {
        dispatch(updateCurrentEventAsync(event));
    });

    api.events.subscribeToUserEventData(lastVisitedEvent, uid, (data) => {
        dispatch(updateUserEventDataAsync(data));
    });
}

function updateCurrentEventAsync(event) {
    return (dispatch, getState) => {
        dispatch(updateCurrentEvent(event))
        let loading = getState().event.eventDataLoading;
        if (loading) {
            dispatch(eventDataDoneLoading());
        }
    }
}

function updateUserEventDataAsync(data) {
     return (dispatch, getState) => {
        dispatch(updateUserEventData(data))
        let loading = getState().event.userEventDataLoading;
        if (loading) {
            dispatch(userEventDataDoneLoading());
        }
    }
}