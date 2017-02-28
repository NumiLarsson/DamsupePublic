import api from 'api/Api';
import { loggedOut } from './auth';
/**
 * Sign out of the application. Send user to main screen.
 */
export function signOut() {
    return (dispatch) => {
        api.auth.signOut().then(
            () => {
                dispatch(loggedOut());
            }
        );
    }
}