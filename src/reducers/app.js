import Immutable from 'immutable';

import { USER_IS_ONLINE, USER_IS_OFFLINE, APP_LOADING, APP_DONE_LOADING } from 'actions/actionTypes';

export const initialState = Immutable.Map({
    online : true,
    loading: true
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
    
        default:
            return state;
    }  
}