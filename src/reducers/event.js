
export const initialState = {
    name: "",
    active: false
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

        default:
            return state;
    }  
}