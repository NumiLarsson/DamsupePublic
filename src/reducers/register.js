import Immutable from 'immutable';
import { REGISTER_LOADING, REGISTER_DONE_LOADING } from 'actions/actionTypes';

export const initialState = Immutable.Map({
    loading: false
})

export default (state = initialState, action) => {
    switch (action.type) {
    
        case REGISTER_LOADING:
            return state.set('loading', true);
        
        case REGISTER_DONE_LOADING:
            return state.set('loading', true);

        default:
            return state;
    }  
}