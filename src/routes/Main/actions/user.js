import api from '../../../api/Api';
//import { push } from 'react-router-redux';


export const subscribeToUserData = (uid) => {
    return (dispatch, getState) => {
        api.user.subscribeToUserData(uid, (userData) => {

            const { lastVisitedEvent } = userData;
            const oldLastVisitedEvent = getState().auth.lastVisitedEvent;

            if (lastVisitedEvent) {
                setupUserDataHooks(dispatch, uid, lastVisitedEvent);
            }
            dispatch({type: 'UPDATE_USER_INFO', payload: userData});
        });
    }
}

export const unsubscribeToUserData = (uid) => {
    return (dispatch) => {
        api.user.unsubscribeToUserData(uid);
        api.events.clearSubscriptions();
    }
}


function setupUserDataHooks(dispatch, uid, lastVisitedEvent) {
    api.events.clearSubscriptions();
    api.events.subscribeToEvent(lastVisitedEvent, (event) => {
        dispatch({type: 'UPDATE_CURRENT_EVENT', payload: event});
    })
    
}