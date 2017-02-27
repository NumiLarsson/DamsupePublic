import Immutable from 'immutable';
import { ADD_EVENT_TO_EVENT_LIST, REMOVE_EVENT_FROM_EVENT_LIST, UPDATE_EVENT_IN_EVENT_LIST } from 'actions/actionTypes';

export const initialState = Immutable.List([])

export default (state = initialState, action) => {
    switch (action.type) {

        case ADD_EVENT_TO_EVENT_LIST: 
            const add = Immutable.Map(action.payload);

            const addIndex = state.findIndex(event => {
                return event.get('id') === add.get('id');
            })

            if (addIndex === -1) {
                return state.push(Immutable.Map(action.payload))
            } else {
                return state.get(addIndex).equals(add) ? state : state.set(addIndex, add);
            }

        
        case UPDATE_EVENT_IN_EVENT_LIST: 
            const upd = action.payload;

            const updIndex = state.findIndex(event => {
                return event.get('id') === upd.id
            })

            if(updIndex !== -1) {
                return state.set(updIndex, Immutable.Map(upd))
            }
            return state;

        case REMOVE_EVENT_FROM_EVENT_LIST: 
            const del = action.payload;
            const delIndex = state.findIndex(event => {
                return event.get('id') === del.id
            });
            
            if(delIndex !== -1) {
                return state.delete(delIndex)
            }

            return state;

        default:
            return state;
    }  
}