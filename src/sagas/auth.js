import { fork, take, call, put, cancel, cancelled, select } from 'redux-saga/effects';
import api from '../api/Api';
import { 
    LISTEN_FOR_AUTH_CHANGES, 
    STOP_LISTEN_FOR_AUTH_CHANGES,
    USER_SIGNED_IN, 
    USER_SIGNED_OUT,
    INITIALIZE_USER_ACCESS,
    CLEANUP_USER_ACCESS 
} from 'actions/actionTypes';
import { signedIn, signedOut, updateUserInfo, resetUserData } from 'actions/auth';
import { appDoneLoading } from 'actions/app';
import { browserHistory } from 'react-router'
import { replace } from 'react-router-redux';
import {getEvent, getGoBack} from './selectors';
import { createUserDataChannel, createAuthChannel} from './channels';



function* subscribeToUserData(userId) {
    let userDataChannel = yield call(createUserDataChannel, userId);
    try {
        while(true) {
            let data = yield take(userDataChannel);
            yield put(updateUserInfo(data));
        }
    } finally {
        if (yield cancelled()) {
            userDataChannel.close();
        }
    }
}


function *userSignedInFlow() {
    while(true) {
        let { payload } = yield take(USER_SIGNED_IN);
        //providerData is an array, the only occurance right now is one, so we use [0].
        let isFacebook = false; //Can't yield inside forEach function, solved it with this:
        payload.providerData.forEach( (providerData) => {
            if (providerData.providerId === 'facebook.com') {
                isFacebook = true;        
            }
        });
        if (isFacebook) {
            //Things only to be ran if the user was created with facebook.
            yield call(api.user.createUserIfNotExists, payload);
        }

        let userDataTask = yield fork(subscribeToUserData, payload.uid);
        const event =  yield select(getEvent);
        const eventChosen = event.get('eventChosen');
        if(eventChosen) {
            const eventId = event.get('id');
            yield put({type: INITIALIZE_USER_ACCESS, payload: eventId});
        }
        yield take(USER_SIGNED_OUT);
        yield cancel(userDataTask);
        yield put({type: CLEANUP_USER_ACCESS});
        yield put(resetUserData());       
    }
}


function* subscribeToAuthChanges() {
    let authChannel = yield call(createAuthChannel);
    try {
        while(true) {
            let result = yield take(authChannel);
            let user = yield result.user;
            //User is signed in
            
            if (user) {
                let location = browserHistory.getCurrentLocation().pathname.split('/');
                let canGoBack = yield select(getGoBack);
                if(!canGoBack && (location[2] === 'login' || location[2] === 'register')) {
                    yield put(replace('/app/eventlist'));
                }
                yield put(signedIn(user));
                yield put(appDoneLoading());
            } else {
                yield put(signedOut());
                yield put(appDoneLoading());
            }
        }
    } finally {
        if (yield cancelled()) {
            authChannel.close();
        }
    }
}


function* authFlow() {
    yield take(LISTEN_FOR_AUTH_CHANGES);
    const authTask = yield fork(subscribeToAuthChanges);
    yield take(STOP_LISTEN_FOR_AUTH_CHANGES);
    yield cancel(authTask);
}

export default function* authRoot() {
    yield fork(authFlow);
    yield fork(userSignedInFlow);
}