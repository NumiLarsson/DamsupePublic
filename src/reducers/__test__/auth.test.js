import auth from '../auth';
import { initialState } from '../auth';

function apply(obj) {
    return Object.assign({}, initialState, obj);
}

it('should return the initial state', () => {
    expect(initialState).toEqual(auth(initialState, {type: 'DEFAULT'}));
})

it('should update authenticated and uid', () => {
    expect(Object.assign({}, initialState, {
        authenticated: true,
        uid: "123"
    })).toEqual(auth(initialState, {type: 'USER_SIGNED_IN', payload: "123"}));
})

it('should reset authenticated and uid', () => {
    expect(auth(apply({authenticated: true, uid: "123"}), {type: 'USER_SIGNED_OUT'}))
    .toEqual(initialState);
})