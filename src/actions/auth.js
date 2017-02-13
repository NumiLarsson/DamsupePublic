import { createAction } from 'redux-actions';
import api from '../api/Api';
import { push } from 'react-router-redux';
import { setupEventUserDataHooks } from './event';


export const signedIn = createAction('USER_SIGNED_IN');
export const signedOut = createAction('USER_SIGNED_OUT');
export const updateUserInfo = createAction('UPDATE_USER_INFO');
export const resetUserData = createAction('RESET_USER_DATA');

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
        subscribeToUserData(dispatch, user.uid, getState);
        dispatch(push('/main'));
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
function subscribeToUserData (dispatch, uid, getState) {
    unsubscribeToUserData(dispatch, false);
    api.user.subscribeToUserData(uid, (userData) => {
        const { lastVisitedEvent } = userData;
        const oldLastVisitedEvent = getState().auth.lastVisitedEvent;
        if(lastVisitedEvent && (lastVisitedEvent !== oldLastVisitedEvent)) {
            setupEventUserDataHooks(dispatch, uid, lastVisitedEvent);
        }
        dispatch(updateUserInfo(userData));
    });
}


/**
 * Unsubscribe to all user data. Used when the user signs out.
 */
//TODO: CLEAR DATA, RESET_USER_DATA ACTION
function unsubscribeToUserData(dispatch, clear) {
    
    if(clear) {
        dispatch(resetUserData());
    }

    api.events.clearSubscriptions();
    api.user.clearSubscriptions();
}