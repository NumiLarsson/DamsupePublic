import auth from '../auth';
import { initialState } from '../auth';

it('should return the initial state', () => {
    expect(initialState).toEqual(auth(initialState, {type: 'DEFAULT'}));
})