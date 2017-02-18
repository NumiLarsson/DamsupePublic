import { createAction } from 'redux-actions';

export const USER_SCREEN_ACTIONS = {
    USER_SCREEN_LOADING: 'USER_SCREEN_LOADING',
    USER_SCREEN_DONE_LOADING: 'USER_SCREEN_DONE_LOADING'
}

export const userScreenLoading = createAction(USER_SCREEN_ACTIONS.USER_SCREEN_LOADING);
export const userScreenDoneLoading = createAction(USER_SCREEN_ACTIONS.USER_SCREEN_DONE_LOADING);