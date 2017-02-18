
import { REGISTER_LOADING, REGISTER_DONE_LOADING } from 'actions/actionTypes';

export const initialState = {
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
    
        case REGISTER_LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        
        case REGISTER_DONE_LOADING:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }  
}