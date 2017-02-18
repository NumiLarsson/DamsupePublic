import { createAction } from 'redux-actions';
import { REGISTER_LOADING, REGISTER_DONE_LOADING } from './actionTypes';

export const registerLoading = createAction(REGISTER_LOADING);
export const registerDoneLoading = createAction(REGISTER_DONE_LOADING);