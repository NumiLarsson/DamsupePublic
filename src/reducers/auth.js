import { AUTH_ACTIONS } from 'actions/auth';

export const initialState = {
    authenticated : false,
    uid: "",
    email: "",
    name: "",
    lastVisitedEvent: ""
}

export default (state = initialState, action) => {
    switch (action.type) {

        case AUTH_ACTIONS.RESET_USER_DATA: 
            return Object.assign({}, state, initialState);
            
        case AUTH_ACTIONS.USER_SIGNED_OUT:
            return Object.assign({}, state, {
                authenticated: false,
                uid: ""
            });
        
        case AUTH_ACTIONS.USER_SIGNED_IN:
            return Object.assign({}, state, {
                authenticated: true,
                uid: action.payload
            });
        
        case AUTH_ACTIONS.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                email: action.payload.email || "",
                name: action.payload.name || "",
                lastVisitedEvent: action.payload.lastVisitedEvent || ""
            });
    

        default:
            return state;
    }  
}