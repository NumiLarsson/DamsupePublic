import login from '../auth';
import { initialState } from '../login';

it('should return the initial state', () => {
    expect(initialState).toEqual(auth(initialState, {type: 'DEFAULT'}));
})