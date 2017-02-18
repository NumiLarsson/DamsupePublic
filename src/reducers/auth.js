import { USER_SIGNED_IN, USER_SIGNED_OUT, UPDATE_USER_INFO, RESET_USER_DATA} from 'actions/actionTypes';

export const initialState = {
    authenticated : false,
    uid: "",
    email: "",
    name: "",
    lastVisitedEvent: ""
}

export default (state = initialState, action) => {
    switch (action.type) {

        case RESET_USER_DATA: 
            return Object.assign({}, state, initialState);
            
        case USER_SIGNED_OUT:
            return Object.assign({}, state, {
                authenticated: false,
                uid: ""
            });
        
        case USER_SIGNED_IN:
            return Object.assign({}, state, {
                authenticated: true,
                uid: action.payload
            });
        
        case UPDATE_USER_INFO:
            return Object.assign({}, state, {
                email: action.payload.email || "",
                name: action.payload.name || "",
                lastVisitedEvent: action.payload.lastVisitedEvent || ""
            });
    

        default:
            return state;
    }  
}