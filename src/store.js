import { createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';
import rootReducer from './reducers/root';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';


const logger = createLogger();
const routerWare = routerMiddleware(browserHistory);
const middleware = [promise, thunk, routerWare];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

/*Initialize the redux store */
const store = createStore(
    rootReducer, 
    applyMiddleware(...middleware)
);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;