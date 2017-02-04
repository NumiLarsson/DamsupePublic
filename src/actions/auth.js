//import { createAction } from 'redux-actions';
import api from '../libs/api';
import { push } from 'react-router-redux';


//const signedIn = createAction('USER_SIGNED_IN');
//const signedOut = createAction('USER_SIGNED_OUT');

/*
 * Async Thunk functions
*/
export function listenForAuthChanges() {
    return (dispatch) => {
        api.listenForAuthChanges(
            (user) => {
                dispatch({type: 'USER_SIGNED_IN'});
                dispatch(push('main'));
            }, //Success
            () => {
                dispatch(push('/login'));
            }
        );
    };
}
