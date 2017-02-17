import React, {Component} from 'react';
import LoginScreen from './Login';
import { enter, leave } from 'utils/animations';

import styles from './styles/Login.css';

class LoginContainer extends Component {

    componentWillEnter(callback) {
        enter(this.container, 0.4, 'right', callback);
    }

    componentWillLeave(callback) {
        leave(this.container, 0.4, 'right', callback);
    }


    render() {
        return (
            <div className={styles.loginScreen} ref={container => this.container = container}>
                <LoginScreen />
            </div>
        ) 
    }
}

module.exports = LoginContainer;