import React, {Component} from 'react';
import { connect } from 'react-redux';
import api from '../../../api/Api';
import './styles/Main.css';

class MainScreen extends Component {
    render() {
        return (
            <div className="main-screen">
                <button onClick={this.props.signOut}>Logout</button>
                <div style={{height: "500px", background: "#333"}}>
                </div>
            </div>
        )
    }
}

//TODO: Fix this hack

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => api.auth.signOut().then(()=> {
            dispatch({type: 'USER_LOGGED_OUT'});
        })
    }
}

module.exports = connect(null, mapDispatchToProps)(MainScreen);