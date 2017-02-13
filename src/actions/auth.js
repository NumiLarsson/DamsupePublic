import { createAction } from 'redux-actions';
import api from '../api/Api';
import { push } from 'react-router-redux';


const signedIn = createAction('USER_SIGNED_IN');
const signedOut = createAction('USER_SIGNED_OUT');
const updateCurrentEvent = createAction('UPDATE_CURRENT_EVENT');
const updateUserInfo = createAction('UPDATE_USER_INFO');

/*
 * Async Thunk functions
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

function subscribeToUserData (dispatch, uid, getState) {
    unsubscribeToUserData();
    api.user.subscribeToUserData(uid, (userData) => {
        const { lastVisitedEvent } = userData;
        const oldLastVisitedEvent = getState().auth.lastVisitedEvent;
        if(lastVisitedEvent && (lastVisitedEvent !== oldLastVisitedEvent)) {
            setupUserDataHooks(dispatch, uid, lastVisitedEvent);
        }
        dispatch(updateUserInfo(userData));
    });
}

function setupUserDataHooks(dispatch, uid, lastVisitedEvent) {
    api.events.clearSubscriptions();
    api.events.subscribeToEvent(lastVisitedEvent, (event) => {
        dispatch(updateCurrentEvent(event));
    });
}


//TODO: CLEAR DATA
function unsubscribeToUserData() {
    api.events.clearSubscriptions();
    api.user.clearSubscriptions();
}