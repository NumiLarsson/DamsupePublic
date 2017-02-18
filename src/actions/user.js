import api from 'api/Api';
import { push } from 'react-router-redux';

/**
 * Sign out of the application. Send user to main screen.
 */
export function signOut() {
    return (dispatch) => {
        api.auth.signOut().then(() => dispatch(push('/')));
    }
}