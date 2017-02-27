import { createAction } from 'redux-actions';
import api from '../api/Api';
import { push } from 'react-router-redux';
import { appDoneLoading } from './app';
import { USER_SIGNED_IN, USER_SIGNED_OUT, UPDATE_USER_INFO, RESET_USER_DATA, USER_LOGGED_OUT} from './actionTypes';

export const loggedOut = createAction(USER_LOGGED_OUT);
export const signedIn = createAction(USER_SIGNED_IN);
export const signedOut = createAction(USER_SIGNED_OUT);
export const updateUserInfo = createAction(UPDATE_USER_INFO);
export const resetUserData = createAction(RESET_USER_DATA);

/**
 * Listen for auth changes and handle user sign in and sign out.
 */
export function listenForAuthChanges() {
    return (dispatch, getState) => {
        api.auth.listenForAuthChanges(
            (user) => {
                handleUserSignIn(dispatch, user, getState);
            }, //Success
            () => {
                dispatch(signedOut());
                unsubscribeToUserData(dispatch, true);
                dispatch(push('/'));
                if(getState().app.get('loading')) {
                    dispatch(appDoneLoading());
                }
            }
        );
    };
}

/** 
 * Handle the case when the user has signed in.
 * @param {function} dispatch - Redux dispatch function.
 * @param {object} user - Firebase.Auth User object.
 * @param {function} getState - Redux thunk getState function.
 */
function handleUserSignIn(dispatch, user, getState) {

    api.user.createUserIfNotExists(user)
    .then(() => {
        dispatch(signedIn(user.uid));
        //Subscribe to user data updates
        subscribeToUserData(dispatch, user.uid);
        //Get the last visited event.
        api.user.getLastVisitedEvent(user.uid)
        .then(eventId => {
            dispatch(push(`/main/event/${eventId}`))
            if(getState().app.get('loading')) {
                dispatch(appDoneLoading());
            }
        })
        .catch(() => {
            dispatch(push(`/main/eventList`));
            if(getState().app.get('loading')) {
                dispatch(appDoneLoading());
            }
        })
    }).catch(err => {
        //TODO: Handle error gracefully
        console.log(err);
    })
}

/**
 * Subscribe to user data.
 * @param {function} dispatch - Redux dispatch function
 * @param {string} uid - Firebase.Auth UserID
 * @param {function} getState - Redux thunk getState function
 */
function subscribeToUserData (dispatch, uid) {
    unsubscribeToUserData(dispatch, false);
    api.user.subscribeToUserData(uid, (userData) => {
        dispatch(updateUserInfo(userData));
    });
}


/**
 * Unsubscribe to all user data. Used when the user signs out.
 * @param {function} dispatch - Redux dispatch function
 * @param {clear} - Flag dictating if the data should be purged.
 */
function unsubscribeToUserData(dispatch, clear) {
    if(clear) {
        dispatch(resetUserData());
    }
    api.user.clearSubscriptions();
}