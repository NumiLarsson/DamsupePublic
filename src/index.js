import React from 'react';
import ReactDOM from 'react-dom';

/*REDUX AND ROUTING */
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store, { history } from './store';
import { listenForAuthChanges } from './actions/auth';

/*APP SPECIFIC IMPORTS */
import api from './libs/api';
import './index.css';
import App from './components/App';
//import Splash from './routes/Splash/components/Splash';

/* Initialize api and start listening for auth changes*/
api.initialize();
store.dispatch(listenForAuthChanges());

const routes = {
    childRoutes: [{
        path: '/',
        component: App,

        getIndexRoute(partialNextState, callback) {
            require.ensure([], function (require) {
            callback(null, {
                component: require('./routes/Splash/components/Splash'),
            })
            })
        },

        childRoutes: [
            require('./routes/Login'),
            require('./routes/Register'),
            require('./routes/Main')
        ]
    }]
};

ReactDOM.render(
 <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
