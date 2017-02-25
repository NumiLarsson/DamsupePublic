import Immutable from 'immutable';
import { USER_SCREEN_LOADING, USER_SCREEN_DONE_LOADING } from 'actions/actionTypes';

const initialState = Immutable.Map({
    userScreenLoading: false
})

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_SCREEN_LOADING:
            return state.set('userScreenLoading', true);
        case USER_SCREEN_DONE_LOADING:
            return state.set('userScreenLoading', false);
        default:
            return state;
    }
}

