
import { REGISTER_ACTIONS } from 'actions/register';

export const initialState = {
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
    
        case REGISTER_ACTIONS.REGISTER_LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        
        case REGISTER_ACTIONS.REGISTER_DONE_LOADING:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }  
}