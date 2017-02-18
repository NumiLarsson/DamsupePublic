import { createAction } from 'redux-actions';

export const NETWORK_ACTIONS = {
    USER_IS_ONLINE: 'USER_IS_ONLINE',
    USER_IS_OFFLINE: 'USER_IS_OFFLINE'
}

export const isOnline = createAction(NETWORK_ACTIONS.USER_IS_ONLINE);
export const isOffline = createAction(NETWORK_ACTIONS.USER_IS_OFFLINE);

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