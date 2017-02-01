import { LOGIN_ACTIONS } from '../actions/login';
const { SIGN_IN_EMAIL, RESET_ERROR } = LOGIN_ACTIONS;

export const initialState = {
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
            
        case RESET_ERROR:
            return Object.assign({}, state, {
                error: initialState.error,
                errorMessage: initialState.errorMessage
            });
        default:
            return state;
    }  
}