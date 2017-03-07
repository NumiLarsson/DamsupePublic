import Immutable from 'immutable';
import { 
    ADD_EVENT_STORE_ITEM,
    DELETE_EVENT_STORE_ITEM,
    UPDATE_EVENT_STORE_ITEM,
    RESET_EVENT_DATA,
    CHANGE_SELECTED_CATEGORY,
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    TOGGLE_SHOW_CHECKOUT
} from 'actions/actionTypes';

export const initialState = Immutable.Map({
    itemsLoading: false,
    showCheckout: false,
    selectedCategory: 1,
    items: Immutable.List(),
    cart: Immutable.List()
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
        
        case ADD_ITEM_TO_CART:
            const newItem = action.payload;
            const addCart = state.get('cart');
            const addCIndex = addCart.findIndex(item => {
                return item.get('id') === newItem.get('id');
            })

            if (addCIndex !== -1) {
                return state.update('cart', cart => {
                    return cart.update(addCIndex, item => {
                        return item.set('count', item.get('count') + 1);
                    })
                })
            } else {
                return state.update('cart', cart => {
                    return cart.push(newItem.set('count', 1));
                })
            }
        
        case REMOVE_ITEM_FROM_CART:
            const delCart = state.get('cart');
            const delId = action.payload;
            const delCIndex = delCart.findIndex(item => {
                return item.get('id') === delId;
            });

            if (delCIndex !== -1) {
                const item = delCart.get(delCIndex);
                if (item.get('count') === 1) {
                    return state.update('cart', cart => {
                        return cart.delete(delCIndex);
                    });
                } else {
                    return state.update('cart', cart => {
                        return cart.update(delCIndex, item => {
                            return item.set('count', item.get('count') - 1);
                        })
                    })
                }
               
            } else {
                return state;
            }
            
        
        case TOGGLE_SHOW_CHECKOUT:
            return state.set('showCheckout', !state.get('showCheckout'));

        default:
            return state;
    }  
}