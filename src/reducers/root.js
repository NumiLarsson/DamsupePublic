import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import app from './app';
import auth from './auth';
import login from './login';
import register from './register';
import main from './main';
import event from './event';

const root = combineReducers({app, auth, login, register, main, event, routing: routerReducer, form: formReducer});

export default root;