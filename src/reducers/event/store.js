import Immutable from 'immutable';
import { 
    ADD_EVENT_STORE_ITEM,
    DELETE_EVENT_STORE_ITEM,
    UPDATE_EVENT_STORE_ITEM,
    RESET_EVENT_DATA,
    CHANGE_SELECTED_CATEGORY
} from 'actions/actionTypes';

export const initialState = Immutable.Map({
    itemsLoading: false,
    selectedCategory: 1,
    items: Immutable.List()
});

export default (state = initialState, action) => {
    switch (action.type) {

        case RESET_EVENT_DATA: 
            return initialState;
            
        case ADD_EVENT_STORE_ITEM:
            return state.update('items', items => {
                return items.push(Immutable.Map(action.payload))
            });

        case DELETE_EVENT_STORE_ITEM:
            const del = action.payload;
            const delIndex = state.get('items').findIndex(item => {
                return item.get('id') === del.id
            });
            
            if(delIndex !== -1) {
                return state.update('items', items => {
                    return items.delete(delIndex);
                })
            }
            return state;    

        case UPDATE_EVENT_STORE_ITEM: 
            const upd = action.payload;
            const updIndex = state.get('items').findIndex(item => {
                return item.get('id') === upd.id
            })

            if(updIndex !== -1) {
                return state.update('items', items => {
                    return items.set(updIndex, Immutable.Map(upd))
                })
            }
            return state;

        case CHANGE_SELECTED_CATEGORY:
            return state.set('selectedCategory', action.payload);
        
        default:
            return state;
    }  
}