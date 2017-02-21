import React, { Component } from 'react';
import { enter, leave } from 'utils/animations';
import HomeScreen from './Home';
//Styles
import styles from './styles/Home.css';

class HomeContainer extends Component {

    componentWillEnter(callback) {
        enter(this.container, 0.4, 'left', callback);
    }

    componentWillLeave(callback) {
        leave(this.container, 0.4, 'left', callback);
    }


    render() {
        return (
                <div ref={container => this.container = container} className={styles.homeScreen}>
                    <HomeScreen />
                </div>
            )
        }
    }

module.exports = HomeContainer;