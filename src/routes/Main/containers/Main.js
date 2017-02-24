import React, { Component } from 'react';

//TODO: Use css modules
import styles from './styles/Main.css';

class MainScreen extends Component {

    render() {
        return (
            <div className={styles.mainContent}>
                {this.props.children}
            </div>
        );
    }
}

module.exports = MainScreen;