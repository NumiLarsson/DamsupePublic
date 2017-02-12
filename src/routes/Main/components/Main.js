import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';
import { subscribeToUserData,  unsubscribeToUserData, checkIfUserHasPreviousEvent } from '../actions/user';
import './styles/Main.css';

class MainScreen extends Component {


    componentWillMount() {
        this.props.subscribeToUserData(this.props.userId);
        //this.props.checkIfUserHasPreviousEvent(this.props.userId);
    }

    componentWillUnmount() {
        this.props.unsubscribeToUserData(this.props.userId);
    }

    render() {
        let content;
        let { children } = this.props;

        if (children) {
            content = children;
        } else {
            content = (
                <Loader> 
                    <div className="spinner">
                        <div className="dot1"></div>
                        <div className="dot2"></div>
                    </div>
                 </Loader>  
            )
        }
        return (
            <div className="main-screen">
                {content}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userId: state.auth.uid
    }
}

const mapDispatchToProps = {
    subscribeToUserData,
    unsubscribeToUserData,
    checkIfUserHasPreviousEvent
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);

/*
  */