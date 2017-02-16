
export const initialState = {
    infoScreenOpen: false,
    mediaScreenOpen: false,
    shopScreenOpen: false,
    userScreenOpen: false,
    userScreenLoading:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'RESET_MENU':
            return initialState;

        case 'INFO_SCREEN_OPEN':
            return Object.assign({}, state, {
                infoScreenOpen: true
            })

        case 'INFO_SCREEN_CLOSE':
            return Object.assign({}, state, {
                infoScreenOpen: false
            })
        case 'MEDIA_SCREEN_OPEN':
            return Object.assign({}, state, {
                mediaScreenOpen: true
            })

        case 'MEDIA_SCREEN_CLOSE':
            return Object.assign({}, state, {
                mediaScreenOpen: false
            })
        case 'SHOP_SCREEN_OPEN':
            return Object.assign({}, state, {
                shopScreenOpen: true
            })

        case 'SHOP_SCREEN_CLOSE':
            return Object.assign({}, state, {
                shopScreenOpen: false
            })
        case 'USER_SCREEN_OPEN':
            return Object.assign({}, state, {
                userScreenOpen: true
            })

        case 'USER_SCREEN_CLOSE':
            return Object.assign({}, state, {
                userScreenOpen: false
            })
        case 'USER_SCREEN_LOADING':
            return Object.assign({}, state, {
                userScreenLoading: true
            })
        case 'USER_SCREEN_DONE_LOADING':
            return Object.assign({}, state, {
                userScreenLoading: false
            })

        default:
            return state;
    }  
}