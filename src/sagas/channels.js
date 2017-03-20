import { eventChannel, buffers } from 'redux-saga';
import { addEventStoreItem, removeEventStoreItem, updateEventStoreItem} from 'actions/store';
import { addEventToEventList, removeEventFromEventList, updateEventInEventList } from 'actions/event';
import api from '../api/Api';
/**
 * AUTHENTICATION CHANNELS
 */
export function createUserDataChannel(userId) {
    return eventChannel(emit => {
        const handler = userObj => {
            if (userObj) {
                emit(userObj);
            }
        };

        let ref = api.user.subscribeToUserData(userId, handler);

        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;
    }, buffers.fixed(1));
}

export function createAuthChannel() {
    return eventChannel(emit => {

        const handler = userObj => {
            emit({user: userObj});
        };

        api.auth.listenForAuthChanges(handler, handler);

        const unsubscribe = () => {}
        return unsubscribe;
    }, buffers.fixed(1));
}  



/**
 * EVENT CHANNELS
 */


export function createUserEventDataChannel(eventId, userId) {
    return eventChannel(emit => {

        const handler = data => {
            emit(data);
        }

        let ref = api.events.subscribeToUserEventData(eventId, userId, handler);
        
        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;
    }, buffers.fixed(1));
}


export function createUserAccessChannel(eventId, userId) {
    return eventChannel(emit => {
        const handler = status => {
            if(status) {
                emit(status);
            }
        }

        let ref = api.events.subscribeToEventAccessStatus(userId, eventId, handler);
        
        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;

    },buffers.fixed(1));
}


export function createEventChannel(eventId) {
    return eventChannel(emit => {

        const handler = event => {
            emit(event);
        };

        let ref = api.events.subscribeToEvent(eventId, handler);

        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;
    }, buffers.fixed(1));
} 

export function createEventListChannel() {
    return eventChannel(emit => {

        const addHandler = event => {
            emit(addEventToEventList(event));
        };

        const updateHandler = event => {
            emit(updateEventInEventList(event));
        };

        const removeHandler = event => {
            emit(removeEventFromEventList(event));
        }

        let ref = api.events.subscribeToEvents(addHandler, updateHandler, removeHandler);

        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;
    }, buffers.fixed(1));
}

/**
 * STORE CHANNELS
 */

export function createItemActionChannel(eventId) {
    return eventChannel(emit => {

        const addHandler = item => {
            emit(addEventStoreItem(item));
        };

        const updateHandler = item => {
            emit(updateEventStoreItem(item));
        };

        const removeHandler = item => {
            emit(removeEventStoreItem(item));
        }

        let ref = api.events.subscribeToEventStoreItems(eventId, addHandler, updateHandler, removeHandler);

        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe;
    })
}