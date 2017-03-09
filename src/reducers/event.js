import { combineReducers } from 'redux';
import menu from './event/menu';
import event from './event/event';
import eventlist from './event/eventlist';
import userdata from './event/userdata';
import store from './event/store';

const main = combineReducers({event, userdata, eventlist, menu, store});

export default main;