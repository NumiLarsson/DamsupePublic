import { createAction } from 'redux-actions';
import { USER_SCREEN_LOADING, USER_SCREEN_DONE_LOADING } from './actionTypes';

export const userScreenLoading = createAction(USER_SCREEN_LOADING);
export const userScreenDoneLoading = createAction(USER_SCREEN_DONE_LOADING);