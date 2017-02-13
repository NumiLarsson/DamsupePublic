import { createAction } from 'redux-actions';
import api from '../api/Api';
import { push } from 'react-router-redux';


const signedIn = createAction('USER_SIGNED_IN');
const signedOut = createAction('USER_SIGNED_OUT');
const updateCurrentEvent = createAction('UPDATE_CURRENT_EVENT');
const updateUserInfo = createAction('UPDATE_USER_INFO');


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
                unsubscribeToUserData();
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
    unsubscribeToUserData();
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
 * Subscribe to data specific to a user or event or a combination.
 * @param {function} dispatch - Redux dispatch function
 * @param {string} uid - Firebase.Auth UserID
 * @param {string} lastVisitedEvent - The event that is currently selected by the user.
 */
function setupEventUserDataHooks(dispatch, uid, lastVisitedEvent) {
    api.events.clearSubscriptions();
    api.events.subscribeToEvent(lastVisitedEvent, (event) => {
        dispatch(updateCurrentEvent(event));
    });
}

/**
 * Unsubscribe to all user data. Used when the user signs out.
 */
//TODO: CLEAR DATA
function unsubscribeToUserData() {
    api.events.clearSubscriptions();
    api.user.clearSubscriptions();
}