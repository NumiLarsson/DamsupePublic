import api from '../../../../../api/Api';
import { push } from 'react-router-redux';

export function signOut() {
    return (dispatch) => {
        api.auth.signOut().then(() => dispatch(push('/')));
    }
}