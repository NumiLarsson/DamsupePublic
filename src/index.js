import React from 'react';
import ReactDOM from 'react-dom';

/*REDUX  */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducers from './reducers/reducers';
import { reducer as formReducer } from 'redux-form'
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

/*APP SPECIFIC IMPORTS */
import App from './App';
import api from './libs/api';
import { listenForAuthChanges } from './actions/auth';
import SplashScreen from './components/splash';
import LoginScreen from './containers/login_screen';
import MainScreen from './containers/main_screen';
import './index.css';


/* Set up redux middleware */

const logger = createLogger();
const routerWare = routerMiddleware(browserHistory);
const middleware = [promise, thunk, routerWare];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

/*Initialize the redux store */
const store = createStore(
    combineReducers({...reducers, routing: routerReducer, form: formReducer}), 
    applyMiddleware(...middleware)
);

/* Sync browserHistory with store */
const history = syncHistoryWithStore(browserHistory, store)

/* Initialize api and start listening for auth changes*/
api.initialize();
store.dispatch(listenForAuthChanges());


ReactDOM.render(
 <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SplashScreen}/>
        <Route path="/login" component={LoginScreen}/>
        <Route path="/main" component={MainScreen}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
