import Immutable from 'immutable';

import { USER_IS_ONLINE, USER_IS_OFFLINE, APP_LOADING, APP_DONE_LOADING, UPDATE_CAN_GO_BACK } from 'actions/actionTypes';

export const initialState = Immutable.Map({
    online : true,
    loading: true,
    canGoBack: false
})

export default (state = initialState, action) => {
    switch (action.type) {

        case USER_IS_ONLINE: 
            return state.set('online', true);
            
        case USER_IS_OFFLINE:
            return state.set('online', false);

        case APP_LOADING:
            return state.set('loading', true);

        case APP_DONE_LOADING:
            return state.set('loading', false);
        
        case UPDATE_CAN_GO_BACK:
            return state.set('canGoBack', action.payload);
    
        default:
            return state;
    }  
}