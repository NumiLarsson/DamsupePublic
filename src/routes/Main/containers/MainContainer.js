import React, {Component} from 'react';
import MainScreen from './Main';
import { enter, leave } from 'utils/animations';

import styles from './styles/Main.css';

class MainContainer extends Component {

    componentWillEnter(callback) {
        enter(this.container, 0.4, 'left', callback);
    }

    componentWillLeave(callback) {
        leave(this.container, 0.4, 'right', callback);
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