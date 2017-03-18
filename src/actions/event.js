import { createAction } from 'redux-actions';

import {INITIALIZE_EVENT, CLEANUP_EVENT, INITIALIZE_EVENT_LIST, CLEANUP_EVENT_LIST,
     UPDATE_CURRENT_EVENT, UPDATE_USER_EVENT_DATA, EVENT_DATA_LOADING, RESET_EVENT_DATA, 
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

export const initializeEventList = createAction(INITIALIZE_EVENT_LIST);
export const cleanupEventList = createAction(CLEANUP_EVENT_LIST);