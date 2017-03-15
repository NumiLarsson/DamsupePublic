import Immutable from 'immutable';

import { RESET_MENU, SHOW_CONTENT, HIDE_CONTENT} from 'actions/actionTypes';

export const initialState = Immutable.Map({
    showContent: false,
    screen: ''
})

export default (state = initialState, action) => {
    switch (action.type) {
        
        case RESET_MENU:
            return initialState;
        
        case SHOW_CONTENT:
            return state.set('showContent', true).set('screen', action.payload);

        case HIDE_CONTENT:
            return state.set('showContent', false).set('screen', action.payload);


        default:
            return state;
    }  
}