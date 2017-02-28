import React, {Component} from 'react';
import MainScreen from './Main';
import { fadeIn, leave } from 'utils/animations';

import styles from './styles/Main.css';

class MainContainer extends Component {

    componentWillEnter(callback) {
        fadeIn(this.container, 0.1, 1, callback);
    }

    componentWillLeave(callback) {
        callback();
    }


    render() {
        return (
            <div className={styles.mainScreen} ref={container => this.container = container}>
                <MainScreen children={this.props.children} location={this.props.location} />
            </div>
        ) 
    }
}

module.exports = MainContainer;