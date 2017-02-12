import api from '../../../api/Api';
import { push } from 'react-router-redux';


export const subscribeToUserData = (uid) => {
    return (dispatch) => {
        api.user.subscribeToUserData(uid, (userData) => {
            dispatch({type: 'UPDATE_USER_INFO', payload: userData});
        });
    }
}

export const unsubscribeToUserData = (uid) => {
    return (dispatch) => {
        api.user.unsubscribeToUserData(uid);
    }
}

export const checkIfUserHasPreviousEvent = (uid) => {
    
    return (dispatch) => {
        api.user.checkIfUserHasPreviousEvent(uid)
        .then(eventId => {
            if(eventId) {
                dispatch(push(`/main/event/:${eventId}`));
            } else {
                dispatch(push(`/main/eventlist`));
            }
        })//TODO: Do something useful with the error.
        .catch(err => {
            console.log(err);
        })
    }
}