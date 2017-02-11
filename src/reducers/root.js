import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import login from './login';
import register from './register';

const root = combineReducers({auth, login, register, routing: routerReducer, form: formReducer});

export default root;