import auth from '../auth';
import { initialState } from '../auth';
import { signedIn, signedOut, updateCurrentEvent, updateUserInfo  } from '../../actions/auth';
import { apply } from './testutils';

it('should return the initial state', () => {
    expect(initialState).toEqual(auth(initialState, {type: 'DEFAULT'}));
})

it('should update authenticated and uid', () => {
    expect(apply({authenticated: true, uid: "123"}, initialState))
    .toEqual(auth(initialState, signedIn("123")));
})

it('should reset authenticated and uid', () => {
    expect(auth(apply({authenticated: true, uid: "123"}, initialState), signedOut()))
    .toEqual(initialState);
})

it('should update user info', () => {
    expect(apply({email:"test@test.se", name:"Test", lastVisitedEvent: "testevent"}, initialState))
    .toEqual(auth(
        initialState, 
        updateUserInfo({email:"test@test.se", name:"Test", lastVisitedEvent: "testevent"})
    ));
})