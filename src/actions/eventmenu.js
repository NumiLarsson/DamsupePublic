import { createAction } from 'redux-actions';
import { RESET_MENU, SHOW_CONTENT, HIDE_CONTENT} from './actionTypes';

export const resetMenu = createAction(RESET_MENU);
export const showContent = createAction(SHOW_CONTENT);
export const hideContent = createAction(HIDE_CONTENT);