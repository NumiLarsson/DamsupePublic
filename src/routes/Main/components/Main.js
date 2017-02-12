import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../../../api/Api';
import Loader from './Loader';
import { subscribeToUserData,  unsubscribeToUserData, checkIfUserHasPreviousEvent } from '../actions/user';
import './styles/Main.css';


class MainScreen extends Component {

    constructor() {
        super();
        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        this.props.subscribeToUserData(this.props.userId);
        console.log(this.props);
        //this.props.checkIfUserHasPreviousEvent(this.props.userId);
    }

    componentWillUnmount() {
        this.props.unsubscribeToUserData(this.props.userId);
    }

    signOut() {
        let self = this;
        api.auth.signOut().then(()=> {
            self.props. dispatch({type: 'USER_LOGGED_OUT'});
        });
    }

    render() {
        return (
            <div className="main-screen">
                {this.props.children}
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

  */