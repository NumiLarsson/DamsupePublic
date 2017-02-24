import { combineReducers } from 'redux';
import menu from './event/menu';
import userscreen from './event/userscreen';
import event from './event/event';
import eventlist from './event/eventlist';

const main = combineReducers({event, eventlist, menu, userscreen});

export default main;