import React from 'react';
import ReactDOM from 'react-dom';

/*REDUX AND ROUTING */
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store, { history } from './store';
import routes from './routes';
import { listenForAuthChanges } from './actions/auth';

/*APP SPECIFIC IMPORTS */
import api from './libs/api';
import './index.css';

/* Initialize api and start listening for auth changes*/
api.initialize();
store.dispatch(listenForAuthChanges());


ReactDOM.render(
 <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
