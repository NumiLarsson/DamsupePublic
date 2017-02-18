import { USER_SCREEN_ACTIONS } from 'actions/userscreen';

const initialState = {
    userScreenLoading: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_SCREEN_ACTIONS.USER_SCREEN_LOADING:
            return Object.assign({}, state, {
                userScreenLoading: true
            });
        case USER_SCREEN_ACTIONS.USER_SCREEN_DONE_LOADING:
            return Object.assign({}, state, {
                userScreenLoading: false
            });
        default:
            return state;
    }
}

