import { REDIRECT_ERROR, REDIRECT_LOADING, NO_REDIRECT, 
    LOGIN_LOADING, LOGIN_DONE_LOADING, USER_SIGNED_IN, USER_LOGGED_OUT } from 'actions/actionTypes';

export const initialState = {
    redirectError : false,
    redirectErrorMsg: '',
    redirectLoading: true,
    userSignedOut: false,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case NO_REDIRECT: 
            return Object.assign({}, state, {
                redirectError: false,
                redirectLoading: false
            });

        case USER_LOGGED_OUT:
            return Object.assign({}, state, {
                userSignedOut: true,
                redirectError: false,
                redirectLoading: false
            })
        
        case USER_SIGNED_IN:
            return Object.assign({}, state, {
                userSignedOut: false
            })

        case REDIRECT_LOADING:
            return Object.assign({}, state, {
                    redirectLoading: true
                });

        case REDIRECT_ERROR:
            return Object.assign({}, state, {
                    redirectLoading: false,
                    redirectError: true,
                    redirectErrorMsg: action.payload
                });
        
        case LOGIN_LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        
        case LOGIN_DONE_LOADING:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }  
}