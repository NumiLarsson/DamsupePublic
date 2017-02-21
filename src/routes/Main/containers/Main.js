import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'actions/user';
import { resetMenu } from 'actions/menu';
import Loader from 'components/Loader/Loader';
import MainHeader from '../components/MainHeader';

//TODO: Use css modules
import styles from './styles/Main.css';

class MainScreen extends Component {

    componentWillMount() {
        this.props.resetMenu();
    }

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
        currentEvent: state.event.name
    }
}

const mapDispatchToProps = {
    resetMenu,
    signOut
}

//
module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);