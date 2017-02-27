import Immutable from 'immutable';
import { REDIRECT_ERROR, REDIRECT_LOADING, NO_REDIRECT, 
    LOGIN_LOADING, LOGIN_DONE_LOADING, USER_SIGNED_IN, USER_LOGGED_OUT } from 'actions/actionTypes';

export const initialState = Immutable.Map({
    redirectError : false,
    redirectErrorMsg: '',
    redirectLoading: true,
    userSignedOut: false,
    loading: false
})

export default (state = initialState, action) => {
    switch (action.type) {

        case NO_REDIRECT: 
            const noRedirect = Immutable.Map({redirectError: false,redirectLoading: false})
            return state.merge(noRedirect);

        case USER_LOGGED_OUT:
            const userLoggedOut = Immutable.Map({userSignedOut: true, redirectError: false, redirectLoading: false})
            return state.merge(userLoggedOut);
        
        case USER_SIGNED_IN:
            return state.set('userSignedOut', false);

        case REDIRECT_LOADING:
            return state.set('redirectLoading', true);

        case REDIRECT_ERROR:
            const redirectError = Immutable.Map({redirectLoading: false, redirectError: true, redirectErrorMsg: action.payload});
            return state.merge(redirectError);
        
        case LOGIN_LOADING:
            return state.set('loading', true);
        
        case LOGIN_DONE_LOADING:
            return state.set('loading', false);

        default:
            return state;
    }  
}