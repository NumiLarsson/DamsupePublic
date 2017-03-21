import Immutable from 'immutable';

import { 
    UPDATE_USER_EVENT_DATA,  
    RESET_USER_DATA, 
    RESET_EVENT_DATA,
    USER_EVENT_DATA_LOADING, 
    USER_EVENT_DATA_DONE_LOADING,
    UPDATE_USER_EVENT_ACCESS,
    UPDATE_USER_EVENT_ACCESS_REQ
} from 'actions/actionTypes';

const initialState = Immutable.Map({
    loading: false,
    userHasAccess: false,
    requestPending: true,
    table: ''
});

export default (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_USER_EVENT_ACCESS:
            return state.set('userHasAccess', action.payload);

        case UPDATE_USER_EVENT_ACCESS_REQ:
            return state.set('requestPending', action.payload);
        
        case UPDATE_USER_EVENT_DATA:
            return state.merge(Immutable.Map(action.payload));
        
        case USER_EVENT_DATA_LOADING:
            return state.set('loading', true);

        case USER_EVENT_DATA_DONE_LOADING:
            return state.set('loading', false);
        
        case RESET_USER_DATA:
            return initialState;
        
        case RESET_EVENT_DATA: 
            return initialState;

        default:
            return state;
    }
}