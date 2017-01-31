import { LOGIN_ACTIONS } from '../actions/login';
const { SIGN_IN_EMAIL, RESET_ERROR, UPDATE_EMAIL_VALUE, UPDATE_PASSWORD_VALUE } = LOGIN_ACTIONS;

const initialState = {
    email: '',
    password: '',
    error: false,
    errorMessage: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SIGN_IN_EMAIL:
            if (action.error) {
                return Object.assign({}, state, {
                    error: true,
                    errorMessage: action.payload.message
                });
            }
            return state;

        case UPDATE_EMAIL_VALUE:
            return Object.assign({}, state, {
                email: action.payload
            });

        case UPDATE_PASSWORD_VALUE:
            return Object.assign({}, state, {
                password: action.payload
            });

        case RESET_ERROR:
            return Object.assign({}, state, {
                error: initialState.error,
                errorMessage: initialState.errorMessage
            });
        default:
            return state;
    }  
}