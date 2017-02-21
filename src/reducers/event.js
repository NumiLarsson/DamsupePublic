import { combineReducers } from 'redux';
import menu from './event/menu';
import userscreen from './event/userscreen';
import event from './event/event';

const main = combineReducers({event, menu, userscreen});

export default main;