import { createAction } from 'redux-actions';
import { APP_LOADING, APP_DONE_LOADING } from './actionTypes';

export const appLoading = createAction(APP_LOADING);
export const appDoneLoading = createAction(APP_DONE_LOADING);