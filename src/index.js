import React from 'react';
import ReactDOM from 'react-dom';

/*REDUX AND ROUTING */
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store, { history } from './store';
import { listenForAuthChanges } from './actions/auth';
import { listenForNetworkChanges } from './actions/network';

/*APP SPECIFIC IMPORTS */
import './index.css';
import App from './components/App';
import TweenMax from 'gsap';

/* Initialize api and start listening for auth changes*/
store.dispatch(listenForAuthChanges());
store.dispatch(listenForNetworkChanges());

const routes = {
    childRoutes: [{
        path: '/',
        component: App,

        getIndexRoute(partialNextState, callback) {
            require.ensure([], function (require) {
            callback(null, {
                component: require('./routes/Home/components/Home'),
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

let root = document.getElementById("root");
let preloader = document.getElementById("preloader");
root.removeChild(preloader);

ReactDOM.render(
 <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  root
);
