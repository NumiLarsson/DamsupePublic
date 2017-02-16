

export const initialState = {
    online : true,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'USER_IS_ONLINE': 
            return Object.assign({}, state, {
                online: true
            });
            
        case 'USER_IS_OFFLINE':
            return Object.assign({}, state, {
                online: false
            });
    
        default:
            return state;
    }  
}