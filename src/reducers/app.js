import Immutable from 'immutable';

import { 
    USER_IS_ONLINE, 
    USER_IS_OFFLINE, 
    APP_LOADING, 
    APP_DONE_LOADING, 
    UPDATE_CAN_GO_BACK,
    ADD_NOTIFICATION
 } from 'actions/actionTypes';

export const initialState = Immutable.Map({
    online : true,
    loading: true,
    canGoBack: false,
    notification: {
        message: '',
        level: '',
        position: ''
    }
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
        
        case ADD_NOTIFICATION:
            let notification = {
                message: action.payload.message,
                level: action.payload.level,
                position: action.payload.position
            }
            return state.set('notification', notification);
    
        default:
            return state;
    }  
}