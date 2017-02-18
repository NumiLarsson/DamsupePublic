import { createAction } from 'redux-actions';
import { REDIRECT_ERROR, REDIRECT_LOADING, NO_REDIRECT, 
    LOGIN_LOADING, LOGIN_DONE_LOADING } from './actionTypes';

export const setRedirectError = createAction(REDIRECT_ERROR);
export const setRedirectLoading = createAction(REDIRECT_LOADING);
export const setNoRedirect = createAction(NO_REDIRECT);
export const setLoading = createAction(LOGIN_LOADING);
export const setDoneLoading = createAction(LOGIN_DONE_LOADING);