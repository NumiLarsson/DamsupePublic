import { createAction } from 'redux-actions';
import { RESET_MENU, INFO_SCREEN_OPEN, INFO_SCREEN_CLOSE,  
         MEDIA_SCREEN_OPEN, MEDIA_SCREEN_CLOSE, SHOP_SCREEN_OPEN,
         SHOP_SCREEN_CLOSE, USER_SCREEN_OPEN, USER_SCREEN_CLOSE} from './actionTypes';

export const resetMenu = createAction(RESET_MENU);
export const infoScreenOpen = createAction(INFO_SCREEN_OPEN);
export const infoScreenClose = createAction(INFO_SCREEN_CLOSE);
export const mediaScreenOpen = createAction(MEDIA_SCREEN_OPEN);
export const mediaScreenClose = createAction(MEDIA_SCREEN_CLOSE);
export const shopScreenOpen = createAction(SHOP_SCREEN_OPEN);
export const shopScreenClose = createAction(SHOP_SCREEN_CLOSE);
export const userScreenOpen = createAction(USER_SCREEN_OPEN);
export const userScreenClose = createAction(USER_SCREEN_CLOSE);
