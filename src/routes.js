import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/app';
import SplashScreen from './components/splash';
import LoginScreen from './containers/login_screen';
import MainScreen from './containers/main_screen';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={SplashScreen}/>
        <Route path="/login" component={LoginScreen}/>
        <Route path="/main" component={MainScreen}/>
    </Route>
);

export default routes;
