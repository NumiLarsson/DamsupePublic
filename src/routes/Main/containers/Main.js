import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/user';

//TODO: Use css modules
require('./styles/Main.css');


class MainScreen extends Component {

    componentWillMount() {
        this.props.resetMenu();
    }

    render() {
        return (
            <div className="mainScreen">
                <header id="mainHeader" className="mainHeader">
                    <h2 onClick={this.props.signOut}>{this.props.currentEvent}</h2>
                </header>
                {this.props.children}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userId: state.auth.uid,
        currentEvent: state.event.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetMenu: () => dispatch({type: 'RESET_MENU'}),
        signOut: () => dispatch(signOut())
    }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);