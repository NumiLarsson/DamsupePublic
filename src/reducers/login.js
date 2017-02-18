import { LOGIN_ACTIONS } from 'actions/login';

export const initialState = {
    redirectError : false,
    redirectErrorMsg: '',
    redirectLoading: true,
    userSignedOut: false,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_ACTIONS.NO_REDIRECT: 
            return Object.assign({}, state, {
                redirectError: false,
                redirectLoading: false
            });

        case LOGIN_ACTIONS.USER_LOGGED_OUT:
            return Object.assign({}, state, {
                userSignedOut: true,
                redirectError: false,
                redirectLoading: false
            })
        
        case LOGIN_ACTIONS.USER_SIGNED_IN:
            return Object.assign({}, state, {
                userSignedOut: false
            })

        case LOGIN_ACTIONS.REDIRECT_LOADING:
            return Object.assign({}, state, {
                    redirectLoading: true
                });

        case LOGIN_ACTIONS.REDIRECT_ERROR:
            return Object.assign({}, state, {
                    redirectLoading: false,
                    redirectError: true,
                    redirectErrorMsg: action.payload
                });
        
        case LOGIN_ACTIONS.LOGIN_LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        
        case LOGIN_ACTIONS.LOGIN_DONE_LOADING:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }  
}