import React, { Component } from 'react';

//TODO: Use css modules
import styles from './styles/Main.css';

class MainScreen extends Component {

    render() {
        let {currentEvent, signOut, eventIsChosen} = this.props;
        return (
            <div className={styles.mainContent}>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eventIsChosen: state.auth.lastVisitedEvent ? true : false,
        currentEvent: state.event.event.name
    }
}

module.exports = MainScreen;