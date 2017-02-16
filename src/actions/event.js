import { createAction } from 'redux-actions';
import api from '../api/Api';

export const updateCurrentEvent = createAction('UPDATE_CURRENT_EVENT');
export const updateUserEventData = createAction('UPDATE_USER_EVENT_DATA');

 /**
 * Subscribe to data specific to a user or event or a combination.
 * @param {function} dispatch - Redux dispatch function
 * @param {string} uid - Firebase.Auth UserID
 * @param {string} lastVisitedEvent - The event that is currently selected by the user.
 */
export function setupEventUserDataHooks(dispatch, uid, lastVisitedEvent) {
    api.events.clearSubscriptions();
    api.events.subscribeToEvent(lastVisitedEvent, (event) => {
        dispatch(updateCurrentEvent(event));
    });

    api.events.subscribeToUserEventData(lastVisitedEvent, uid, (event) => {
        dispatch(updateUserEventData(event));
    });
}