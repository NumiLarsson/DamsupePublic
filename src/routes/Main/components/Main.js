import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Main.css';


class MainScreen extends Component {

    componentWillMount() {
        this.props.resetMenu();
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
        userId: state.auth.uid,
        currentEvent: state.auth.lastVisitedEvent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetMenu: () => dispatch({type: 'RESET_MENU'})
    }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);