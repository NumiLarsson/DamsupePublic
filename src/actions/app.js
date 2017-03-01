import { createAction } from 'redux-actions';
import { goBack, replace } from 'react-router-redux';
import { APP_LOADING, APP_DONE_LOADING, UPDATE_CAN_GO_BACK } from './actionTypes';

export const appLoading = createAction(APP_LOADING);
export const appDoneLoading = createAction(APP_DONE_LOADING);
export const updateCanGoBack = createAction(UPDATE_CAN_GO_BACK);

export function navigateOrGoBack(path) {
    return (dispatch, getState) => {
        if (getState().app.get('canGoBack') === true) {
            dispatch(goBack());
        } else {
            dispatch(replace(path));
        } 
    }
}

export function navigateReplace(path) {
    return dispatch => {
        dispatch(replace(path));
    }
}