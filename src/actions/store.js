import { createAction } from 'redux-actions';
import { 
    ADD_EVENT_STORE_ITEM,
    DELETE_EVENT_STORE_ITEM,
    UPDATE_EVENT_STORE_ITEM,
    CHANGE_SELECTED_CATEGORY,
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    TOGGLE_SHOW_CHECKOUT
} from 'actions/actionTypes';

export const addEventStoreItem = createAction(ADD_EVENT_STORE_ITEM);
export const removeEventStoreItem = createAction(DELETE_EVENT_STORE_ITEM);
export const updateEventStoreItem = createAction(UPDATE_EVENT_STORE_ITEM);
export const addItemToCart = createAction(ADD_ITEM_TO_CART);
export const removeItemFromCart = createAction(REMOVE_ITEM_FROM_CART);
export const clearCart = createAction(CLEAR_CART);
export const changeSelectedCategory = createAction(CHANGE_SELECTED_CATEGORY);
export const toggleShowCheckout = createAction(TOGGLE_SHOW_CHECKOUT);