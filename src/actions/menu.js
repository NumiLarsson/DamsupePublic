import { createAction } from 'redux-actions';

export const MENU_ACTIONS = {
    RESET_MENU: 'RESET_MENU',
    INFO_SCREEN_OPEN: 'INFO_SCREEN_OPEN',
    INFO_SCREEN_CLOSE: 'INFO_SCREEN_CLOSE',
    MEDIA_SCREEN_OPEN: 'MEDIA_SCREEN_OPEN',
    MEDIA_SCREEN_CLOSE: 'MEDIA_SCREEN_CLOSE',
    SHOP_SCREEN_OPEN: 'SHOP_SCREEN_OPEN',
    SHOP_SCREEN_CLOSE: 'SHOP_SCREEN_CLOSE',
    USER_SCREEN_OPEN: 'USER_SCREEN_OPEN',
    USER_SCREEN_CLOSE: 'USER_SCREEN_CLOSE'
}

export const resetMenu = createAction(MENU_ACTIONS.RESET_MENU);
export const infoScreenOpen = createAction(MENU_ACTIONS.INFO_SCREEN_OPEN);
export const infoScreenClose = createAction(MENU_ACTIONS.INFO_SCREEN_CLOSE);
export const mediaScreenOpen = createAction(MENU_ACTIONS.MEDIA_SCREEN_OPEN);
export const mediaScreenClose = createAction(MENU_ACTIONS.MEDIA_SCREEN_CLOSE);
export const shopScreenOpen = createAction(MENU_ACTIONS.SHOP_SCREEN_OPEN);
export const shopScreenClose = createAction(MENU_ACTIONS.SHOP_SCREEN_CLOSE);
export const userScreenOpen = createAction(MENU_ACTIONS.USER_SCREEN_OPEN);
export const userScreenClose = createAction(MENU_ACTIONS.USER_SCREEN_CLOSE);
