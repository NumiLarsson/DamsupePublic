import { createAction } from 'redux-actions';
import api from '../api/Api';

import { 
    ADD_EVENT_STORE_ITEM,
    DELETE_EVENT_STORE_ITEM,
    UPDATE_EVENT_STORE_ITEM,
    CHANGE_SELECTED_CATEGORY,
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART
} from 'actions/actionTypes';

const addEventStoreItem = createAction(ADD_EVENT_STORE_ITEM);
const removeEventStoreItem = createAction(DELETE_EVENT_STORE_ITEM);
const updateEventStoreItem = createAction(UPDATE_EVENT_STORE_ITEM);
export const addItemToCart = createAction(ADD_ITEM_TO_CART);
export const removeItemFromCart = createAction(REMOVE_ITEM_FROM_CART);
export const changeSelectedCategory = createAction(CHANGE_SELECTED_CATEGORY);


export function setupEventStoreDataHooks(eventId) {
    return dispatch => {
        api.events.subscribeToEventStoreItems(eventId,
            item => dispatch(addEventStoreItem(item)),
            item => dispatch(updateEventStoreItem(item)),
            item => dispatch(removeEventStoreItem(item)),
        )
    }
}