import { createAction } from 'redux-actions';
import api from '../api/Api';
import { push } from 'react-router-redux';


const signedIn = createAction('USER_SIGNED_IN');
const signedOut = createAction('USER_SIGNED_OUT');

/*
 * Async Thunk functions
*/
export function listenForAuthChanges() {
    return (dispatch) => {
        api.auth.listenForAuthChanges(
            (user) => {
                handleUserSignIn(dispatch, user);
            }, //Success
            () => {
                dispatch(signedOut());
                dispatch(push('/'));
            }
        );
    };
}

function handleUserSignIn(dispatch, user) {

    api.user.createUserIfNotExists(user)
    .then(() => {
        dispatch(signedIn(user.uid));
        dispatch(push('/main'));
    }).catch(err => {
        //TODO: Handle error gracefully
        console.log(err);
    })


}