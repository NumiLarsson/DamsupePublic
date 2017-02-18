import { UPDATE_CURRENT_EVENT, UPDATE_USER_EVENT_DATA, EVENT_DATA_LOADING, RESET_USER_DATA, 
         EVENT_DATA_DONE_LOADING, USER_EVENT_DATA_LOADING, USER_EVENT_DATA_DONE_LOADING} from 'actions/actionTypes';

export const initialState = {
    eventDataLoading: false,
    userEventDataLoading: false,
    name: "",
    active: false,
    userData: {
        table: ''
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case RESET_USER_DATA: 
            return Object.assign({}, state, initialState);

        case EVENT_DATA_LOADING:
            return Object.assign({}, state, {
                eventDataLoading: true
            });

        case EVENT_DATA_DONE_LOADING:
            return Object.assign({}, state, {
                eventDataLoading: false
            });

        case USER_EVENT_DATA_LOADING:
            return Object.assign({}, state, {
                userEventDataLoading: true
            });
            
        case USER_EVENT_DATA_DONE_LOADING:
            return Object.assign({}, state, {
                userEventDataLoading: false
            });

        case UPDATE_CURRENT_EVENT:
            const {name, active} = action.payload;
            return Object.assign({}, state, {
                name, 
                active
            });
        
        case UPDATE_USER_EVENT_DATA:
            return Object.assign({}, state, {
                userData: Object.assign({}, state.userData, {
                    table: action.payload ? action.payload.table || '' : ''
                })
            });

        default:
            return state;
    }  
}