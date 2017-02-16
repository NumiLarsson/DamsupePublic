
export const initialState = {
    name: "",
    active: false,
    userData: {
        table: ''
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'RESET_USER_DATA': 
            return Object.assign({}, state, initialState);

        case 'UPDATE_CURRENT_EVENT':
            const {name, active} = action.payload;
            return Object.assign({}, state, {
                name, 
                active
            });
        
        case 'UPDATE_USER_EVENT_DATA':
            return Object.assign({}, state, {
                userData: Object.assign({}, state.userData, {
                    table: action.payload ? action.payload.table || '' : ''
                })
            });

        default:
            return state;
    }  
}