import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'actions/user';
import MainHeader from '../components/MainHeader';

//TODO: Use css modules
import styles from './styles/Main.css';

class MainScreen extends Component {

    render() {
        let {currentEvent, signOut, eventIsChosen} = this.props;
        return (
            <div className={styles.mainContent}>
                <MainHeader signOut={signOut} currentEvent={currentEvent} eventIsChosen={eventIsChosen}/>
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

const mapDispatchToProps = {
    signOut
}

//
module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);