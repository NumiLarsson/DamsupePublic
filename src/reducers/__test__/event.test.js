import event from '../event';
import { initialState } from '../event';
import { updateCurrentEvent } from '../../actions/event';
import { apply } from './testutils';

it('should update the current event information', () => {
    expect(apply({name: 'Testevent', active: true}, initialState))
    .toEqual(event(initialState, updateCurrentEvent({name: 'Testevent', active: true})));
})