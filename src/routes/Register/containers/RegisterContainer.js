import React, {Component} from 'react';
import RegisterScreen from './Register';
import { enter, leave } from 'utils/animations';

import styles from './styles/Register.css';

class RegisterContainer extends Component {

    componentWillEnter(callback) {
        enter(this.container, 0.4, 'right', callback);
    }

    componentWillLeave(callback) {
        leave(this.container, 0.4, 'right', callback);
    }


    render() {
        return (
            <div className={styles.registerScreen} ref={container => this.container = container}>
                <RegisterScreen />
            </div>
        ) 
    }
}

module.exports = RegisterContainer;