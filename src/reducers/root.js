import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import login from './login';

const root = combineReducers({auth, login, routing: routerReducer, form: formReducer});

export default root;