import Immutable from 'immutable';
import { 
    UPDATE_CURRENT_EVENT, 
    EVENT_DATA_LOADING, 
    RESET_EVENT_DATA,
    EVENT_DATA_DONE_LOADING
} from 'actions/actionTypes';

export const initialState = Immutable.Map({
    id: '',
    eventChosen: false,
    loading: false,
    name: "",
    date: 0,
    start: '',
    end: '',
    type: '',
    description: '',
    active: false,
    shopImage: '',
    infoImage: '',
    mediaImage: ''
});

export default (state = initialState, action) => {
    switch (action.type) {

        case RESET_EVENT_DATA: 
            return initialState;

        case EVENT_DATA_LOADING:
            return state.set('loading', true);     

        case EVENT_DATA_DONE_LOADING:
           return state.set('loading', false);

        case UPDATE_CURRENT_EVENT:
            const upd = Immutable.Map(action.payload).set('eventChosen', true);
            return state.merge(upd);
    

        default:
            return state;
    }  
}