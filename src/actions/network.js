import { createAction } from 'redux-actions';

export const isOnline = createAction('USER_IS_ONLINE');
export const isOffline = createAction('USER_IS_OFFLINE');

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