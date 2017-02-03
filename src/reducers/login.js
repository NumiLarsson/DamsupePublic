
export const initialState = {
    redirectError : false,
    redirectLoading: true
}

export default (state = initialState, action) => {
    switch (action.type) {

        case "NO_REDIRECT": 
            return Object.assign({}, state, {
                redirectError: false,
                redirectLoading: false
            });

        case 'REDIRECT_LOADING':
            return Object.assign({}, state, {
                    redirectLoading: true
                });

        case 'REDIRECT_ERROR':
            return Object.assign({}, state, {
                    redirectError: true
                });

        default:
            return state;
    }  
}