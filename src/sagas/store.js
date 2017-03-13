import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, cancelled } from 'redux-saga/effects';
import { addEventStoreItem, removeEventStoreItem, updateEventStoreItem} from 'actions/store';
import { SUBSCRIBE_TO_STORE_ITEMS, RESET_EVENT_DATA } from 'actions/actionTypes';
import api from 'api/Api';


function createItemActionChannel(eventId) {
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

function* subscribeToStoreItems(eventId) {
    const chan = yield call(createItemActionChannel, eventId);
    try {
        while (true) {
            let action = yield take(chan);
            yield put(action);
        }
    } finally {
        if (yield cancelled()) {
            chan.close();
        }
    }
}

function* storeFlow() {
    while(true) {
        let { payload } = yield take(SUBSCRIBE_TO_STORE_ITEMS);
        const task = yield fork(subscribeToStoreItems, payload);
        let action = yield take(RESET_EVENT_DATA);
        yield cancel(task);
    }
}

export default function* storeRoot() {
    yield fork(storeFlow);
}
