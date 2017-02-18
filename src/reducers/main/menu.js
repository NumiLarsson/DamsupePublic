import { MENU_ACTIONS } from 'actions/menu';

export const initialState = {
    infoScreenOpen: false,
    mediaScreenOpen: false,
    shopScreenOpen: false,
    userScreenOpen: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case MENU_ACTIONS.RESET_MENU:
            return initialState;

        case MENU_ACTIONS.INFO_SCREEN_OPEN:
            return Object.assign({}, state, {
                infoScreenOpen: true
            })

        case MENU_ACTIONS.INFO_SCREEN_CLOSE:
            return Object.assign({}, state, {
                infoScreenOpen: false
            })
        case MENU_ACTIONS.MEDIA_SCREEN_OPEN:
            return Object.assign({}, state, {
                mediaScreenOpen: true
            })

        case MENU_ACTIONS.MEDIA_SCREEN_CLOSE:
            return Object.assign({}, state, {
                mediaScreenOpen: false
            })
        case MENU_ACTIONS.SHOP_SCREEN_OPEN:
            return Object.assign({}, state, {
                shopScreenOpen: true
            })

        case MENU_ACTIONS.SHOP_SCREEN_CLOSE:
            return Object.assign({}, state, {
                shopScreenOpen: false
            })
        case MENU_ACTIONS.USER_SCREEN_OPEN:
            return Object.assign({}, state, {
                userScreenOpen: true
            })

        case MENU_ACTIONS.USER_SCREEN_CLOSE:
            return Object.assign({}, state, {
                userScreenOpen: false
            })

        default:
            return state;
    }  
}