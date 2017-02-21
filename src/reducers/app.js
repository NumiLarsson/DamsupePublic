import { USER_IS_ONLINE, USER_IS_OFFLINE, APP_LOADING, APP_DONE_LOADING } from 'actions/actionTypes';

export const initialState = {
    online : true,
    loading: true
}

export default (state = initialState, action) => {
    switch (action.type) {

        case USER_IS_ONLINE: 
            return Object.assign({}, state, {
                online: true
            });
            
        case USER_IS_OFFLINE:
            return Object.assign({}, state, {
                online: false
            });

        case APP_LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        case APP_DONE_LOADING:
            return Object.assign({}, state, {
                loading: false
            });
    
        default:
            return state;
    }  
}