import { createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/root';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootSaga from 'sagas/root';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();
const routerWare = routerMiddleware(browserHistory);
const middleware = [promise, sagaMiddleware, thunk, routerWare];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

/*Initialize the redux store */
const store = createStore(
    rootReducer, 
    applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;