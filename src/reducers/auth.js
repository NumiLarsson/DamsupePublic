import Immutable from 'immutable';
import { USER_SIGNED_IN, USER_SIGNED_OUT, UPDATE_USER_INFO, RESET_USER_DATA} from 'actions/actionTypes';

export const initialState = Immutable.Map({
    authenticated : false,
    uid: "",
    email: "",
    name: "",
    lastVisitedEvent: ""
})

export default (state = initialState, action) => {
    switch (action.type) {

        case RESET_USER_DATA: 
            return initialState;
            
        case USER_SIGNED_OUT:
            return state.merge(Immutable.Map({authenticated: false, uid: ""}));

        case USER_SIGNED_IN:
            return state.merge(Immutable.Map({authenticated: true, uid: action.payload}));
        
        case UPDATE_USER_INFO:
            let newVals = Immutable.Map({
                email: action.payload.email || "",
                name: action.payload.name || "",
                lastVisitedEvent: action.payload.lastVisitedEvent || ""
            });
            return state.merge(newVals);
           
        default:
            return state;
    }  
}