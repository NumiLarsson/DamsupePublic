import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducers from './reducers/reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import App from './App';
import api from './libs/api';
import { listenForAuthChanges } from './actions/auth';
import SplashScreen from './components/splash';
import LoginScreen from './containers/login_screen';
import './index.css';


const logger = createLogger();
const routerWare = routerMiddleware(browserHistory);
const middleware = [promise, thunk, routerWare];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const store = createStore(
    combineReducers({...reducers, routing: routerReducer}), 
    applyMiddleware(...middleware)
  );

const history = syncHistoryWithStore(browserHistory, store)

api.initialize();
store.dispatch(listenForAuthChanges());


ReactDOM.render(
 <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SplashScreen}/>
        <Route path="/login" component={LoginScreen}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
