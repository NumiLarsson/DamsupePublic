import { createAction } from 'redux-actions';
import { USER_IS_ONLINE, USER_IS_OFFLINE } from './actionTypes';

export const isOnline = createAction(USER_IS_ONLINE);
export const isOffline = createAction(USER_IS_OFFLINE);

/**
 * Listen for changes in network connectivity.
 */
export function listenForNetworkChanges() {
    return dispatch => {
        if(navigator.onLine) {
            dispatch(isOnline());
        } else {
            dispatch(isOffline());
        }
        window.addEventListener('online', () => {
            dispatch(isOnline());
        });
        window.addEventListener('offline', () => {
            dispatch(isOffline());
        })
    }
}