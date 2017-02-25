import Immutable from 'immutable';

import { RESET_MENU, INFO_SCREEN_OPEN, INFO_SCREEN_CLOSE,  
         MEDIA_SCREEN_OPEN, MEDIA_SCREEN_CLOSE, SHOP_SCREEN_OPEN,
         SHOP_SCREEN_CLOSE, USER_SCREEN_OPEN, USER_SCREEN_CLOSE} from 'actions/actionTypes';

export const initialState = Immutable.Map({
    infoScreenOpen: false,
    mediaScreenOpen: false,
    shopScreenOpen: false,
    userScreenOpen: false
})

export default (state = initialState, action) => {
    switch (action.type) {
        
        case RESET_MENU:
            return initialState;

        case INFO_SCREEN_OPEN:
            return state.set('infoScreenOpen', true);

        case INFO_SCREEN_CLOSE:
            return state.set('infoScreenOpen', false);

        case MEDIA_SCREEN_OPEN:
            return state.set('mediaScreenOpen', true);

        case MEDIA_SCREEN_CLOSE:
            return state.set('mediaScreenOpen', false);

        case SHOP_SCREEN_OPEN:
            return state.set('shopScreenOpen', true);

        case SHOP_SCREEN_CLOSE:
            return state.set('shopScreenOpen', false);

        case USER_SCREEN_OPEN:
            return state.set('userScreenOpen', true);

        case USER_SCREEN_CLOSE:
            return state.set('userScreenOpen', false);

        default:
            return state;
    }  
}