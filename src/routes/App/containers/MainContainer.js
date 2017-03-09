import React, {Component} from 'react';
import MainScreen from './Main';

import styles from './styles/Main.css';

class MainContainer extends Component {

    componentWillEnter(callback) {
        callback();
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