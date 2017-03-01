import { combineReducers } from 'redux';
import menu from './event/menu';
import userscreen from './event/userscreen';
import event from './event/event';
import eventlist from './event/eventlist';
import userdata from './event/userdata';

const main = combineReducers({event, userdata, eventlist, menu, userscreen});

export default main;