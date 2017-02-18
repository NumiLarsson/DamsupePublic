import { createAction } from 'redux-actions';

export const REGISTER_ACTIONS = {
    REGISTER_LOADING: 'REGISTER_LOADING',
    REGISTER_DONE_LOADING: 'REGISTER_DONE_LOADING'
}

export const registerLoading = createAction('REGISTER_LOADING');
export const registerDoneLoading = createAction('REGISTER_DONE_LOADING');