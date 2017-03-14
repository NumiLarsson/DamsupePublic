import { fork, take, call, put, cancel, cancelled } from 'redux-saga/effects';
import { INIT_STORE, CLEANUP_STORE } from 'actions/actionTypes';

import { createItemActionChannel } from './channels';



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
        let { payload } = yield take(INIT_STORE);
        const task = yield fork(subscribeToStoreItems, payload);
        yield take(CLEANUP_STORE);
        yield cancel(task);
    }
}

export default function* storeRoot() {
    yield fork(storeFlow);
}
