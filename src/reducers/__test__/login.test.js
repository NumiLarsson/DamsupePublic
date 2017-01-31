import login from '../login';
import { initialState } from '../login';

it('should return the initial state', () => {
    expect(initialState).toEqual(login(initialState, {type: 'DEFAULT'}));
})