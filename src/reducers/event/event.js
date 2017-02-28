import Immutable from 'immutable';
import { 
    UPDATE_CURRENT_EVENT, 
    UPDATE_USER_EVENT_DATA, 
    EVENT_DATA_LOADING, 
    RESET_USER_DATA, 
    RESET_EVENT_DATA,
    EVENT_DATA_DONE_LOADING, 
    USER_EVENT_DATA_LOADING, 
    USER_EVENT_DATA_DONE_LOADING, 
    UPDATE_USER_EVENT_ACCESS
} from 'actions/actionTypes';

export const initialState = Immutable.Map({
    id: '',
    eventChosen: false,
    eventDataLoading: false,
    userEventDataLoading: false,
    name: "",
    active: false,
    userHasAccess: false,
    userData: Immutable.Map({
        table: ''
    })
});

export default (state = initialState, action) => {
    switch (action.type) {

        case RESET_USER_DATA:
            const resetState=Immutable.Map({
                userHasAccess: initialState.get('userHasAccess'),
                userData: initialState.get('userData')
            }) 
            return state.merge(resetState);

        case RESET_EVENT_DATA: 
            return initialState;

        case EVENT_DATA_LOADING:
            return state.set('eventDataLoading', true);     

        case EVENT_DATA_DONE_LOADING:
           return state.set('eventDataLoading', false);

        case USER_EVENT_DATA_LOADING:
            return state.set('userEventDataLoading', true);
            
        case USER_EVENT_DATA_DONE_LOADING:
            return state.set('userEventDataLoading', false);

        case UPDATE_CURRENT_EVENT:
            const upd = Immutable.Map(action.payload).set('eventChosen', true);
            return state.merge(upd);
        
        case UPDATE_USER_EVENT_ACCESS:
            return state.set('userHasAccess', action.payload);

        case UPDATE_USER_EVENT_DATA:
            return state.set('userData', Immutable.Map(action.payload));

        default:
            return state;
    }  
}