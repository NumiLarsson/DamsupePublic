import { createAction } from 'redux-actions';

export const infoScreenOpen = createAction('INFO_SCREEN_OPEN');
export const mediaScreenOpen = createAction('MEDIA_SCREEN_OPEN');
export const shopScreenOpen = createAction('SHOP_SCREEN_OPEN');
export const userScreenOpen = createAction('USER_SCREEN_OPEN');
export const infoScreenClose = createAction('INFO_SCREEN_CLOSE');
export const mediaScreenClose = createAction('MEDIA_SCREEN_CLOSE');
export const shopScreenClose = createAction('SHOP_SCREEN_CLOSE');
export const userScreenClose = createAction('USER_SCREEN_CLOSE');
