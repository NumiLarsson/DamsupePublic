import { createAction } from 'redux-actions';

export const LOGIN_ACTIONS = {
    REDIRECT_ERROR: 'REDIRECT_ERROR',
    REDIRECT_LOADING: 'REDIRECT_LOADING',
    NO_REDIRECT: 'NO_REDIRECT',
    LOGIN_LOADING: 'LOGIN_LOADING',
    LOGIN_DONE_LOADING: 'LOGIN_DONE_LOADING'
}

export const setRedirectError = createAction(LOGIN_ACTIONS.REDIRECT_ERROR);
export const setRedirectLoading = createAction(LOGIN_ACTIONS.REDIRECT_LOADING);
export const setNoRedirect = createAction(LOGIN_ACTIONS.NO_REDIRECT);
export const setLoading = createAction(LOGIN_ACTIONS.LOGIN_LOADING);
export const setDoneLoading = createAction(LOGIN_ACTIONS.LOGIN_DONE_LOADING);