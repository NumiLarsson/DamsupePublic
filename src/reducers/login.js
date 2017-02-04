
export const initialState = {
    redirectError : false,
    redirectErrorMsg: '',
    redirectLoading: true,
    userSignedOut: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case "NO_REDIRECT": 
            return Object.assign({}, state, {
                redirectError: false,
                redirectLoading: false
            });

        case 'USER_SIGNED_OUT':
            return Object.assign({}, state, {
                userSignedOut: true,
                redirectError: false,
                redirectLoading: false
            })
        
        case 'USER_SIGNED_IN':
            return Object.assign({}, state, {
                userSignedOut: false
            })

        case 'REDIRECT_LOADING':
            return Object.assign({}, state, {
                    redirectLoading: true
                });

        case 'REDIRECT_ERROR':
            return Object.assign({}, state, {
                    redirectLoading: false,
                    redirectError: true,
                    redirectErrorMsg: action.payload
                });

        default:
            return state;
    }  
}