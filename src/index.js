import React from 'react';
import ReactDOM from 'react-dom';

/*REDUX AND ROUTING */
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store, { history } from './store';
import { LISTEN_FOR_AUTH_CHANGES } from './actions/actionTypes';
import { listenForNetworkChanges } from './actions/network';

/*APP SPECIFIC IMPORTS */
import './index.css';
import App from './containers/App';
//import TweenMax from 'gsap';
//import ScrollToPlugin from "gsap/ScrollToPlugin";
require('gsap');
require('gsap/ScrollToPlugin');

/* Initialize api and start listening for auth changes*/
store.dispatch({type: LISTEN_FOR_AUTH_CHANGES});
store.dispatch(listenForNetworkChanges());

const routes = {
    childRoutes: [{
        path: '/',
        component: App,

        getIndexRoute(partialNextState, callback) {
            require.ensure([], function (require) {
            callback(null, {
                component: require('./routes/Home/containers/HomeContainer'),
            })
            })
        },

        childRoutes: [
            require('./routes/App'),
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