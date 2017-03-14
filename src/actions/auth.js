import { createAction } from 'redux-actions';
import { USER_SIGNED_IN, USER_SIGNED_OUT, UPDATE_USER_INFO, RESET_USER_DATA, USER_LOGGED_OUT} from './actionTypes';

export const loggedOut = createAction(USER_LOGGED_OUT);
export const signedIn = createAction(USER_SIGNED_IN);
export const signedOut = createAction(USER_SIGNED_OUT);
export const updateUserInfo = createAction(UPDATE_USER_INFO);
export const resetUserData = createAction(RESET_USER_DATA);