import { createAction } from 'redux-actions';

export const infoScreenOpen = createAction('INFO_SCREEN_OPEN');
export const infoScreenClose = createAction('INFO_SCREEN_CLOSE');
export const mediaScreenOpen = createAction('MEDIA_SCREEN_OPEN');
export const mediaScreenClose = createAction('MEDIA_SCREEN_CLOSE');
export const shopScreenOpen = createAction('SHOP_SCREEN_OPEN');
export const shopScreenClose = createAction('SHOP_SCREEN_CLOSE');
export const userScreenOpen = createAction('USER_SCREEN_OPEN');
export const userScreenClose = createAction('USER_SCREEN_CLOSE');
export const userScreenLoading = createAction('USER_SCREEN_LOADING');
export const userScreenDoneLoading = createAction('USER_SCREEN_DONE_LOADING');