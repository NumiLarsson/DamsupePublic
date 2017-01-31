import { createAction } from 'redux-actions';
import api from '../libs/api';

export const LOGIN_ACTIONS = {
    RESET_ERROR: 'RESET_ERROR',
    SIGN_IN_EMAIL: 'SIGN_IN_EMAIL',
    SIGN_IN_FACEBOOK: 'SIGN_IN_FACEBOOK',
    UPDATE_EMAIL_VALUE: 'UPDATE_EMAIL_VALUE',
    UPDATE_PASSWORD_VALUE: 'UPDATE_PASSWORD_VALUE'
};


export const signInWithEmail = createAction(LOGIN_ACTIONS.SIGN_IN_EMAIL, api.signInWithEmail);
export const signInWithFacebook = createAction(LOGIN_ACTIONS.SIGN_IN_FACEBOOK, api.signInWithFacebook);

// Wrapper around api.signout
export function signOut() {
    return (dispatch) => {
        api.signOut()
        .catch((error) => {
            //TODO: Handle signout error.
        });
    }
}

export const resetError = createAction(LOGIN_ACTIONS.RESET_ERROR);
export const updateEmail = createAction(LOGIN_ACTIONS.UPDATE_EMAIL_VALUE);
export const updatePassword = createAction(LOGIN_ACTIONS.UPDATE_PASSWORD_VALUE);