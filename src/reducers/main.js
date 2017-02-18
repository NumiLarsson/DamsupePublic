import { combineReducers } from 'redux';
import menu from './main/menu';
import userscreen from './main/userscreen';


const main = combineReducers({menu, userscreen});

export default main;