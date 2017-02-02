import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import auth from './auth';

const root = combineReducers({auth, routing: routerReducer, form: formReducer});

export default root;