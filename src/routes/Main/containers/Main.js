import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'actions/user';
import { resetMenu } from 'actions/menu';
import Loader from 'components/Loader/Loader';

//TODO: Use css modules
import styles from './styles/Main.css';


class MainScreen extends Component {

    componentWillMount() {
        this.props.resetMenu();
    }

    render() {
        let {eventDataLoading, userEventDataLoading, currentEvent, signOut} = this.props;
        return (
            <div className={styles.mainContent}>
                <Loader show={eventDataLoading || userEventDataLoading} />
                <header id={styles.mainHeader} className={styles.mainHeader}>
                    <h2 onClick={signOut}>{currentEvent}</h2>
                </header>
                {this.props.children}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userId: state.auth.uid,
        currentEvent: state.event.name,
        eventDataLoading: state.event.eventDataLoading,
        userEventDataLoading: state.event.userEventDataLoading,
    }
}

const mapDispatchToProps = {
    resetMenu,
    signOut
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);