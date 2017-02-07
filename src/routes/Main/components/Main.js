import React, {Component} from 'react';
import { connect } from 'react-redux';
import api from '../../../api/Api';
import MdAccountCircle from 'react-icons/lib/md/account-circle';

class MainScreen extends Component {
    render() {
        return (
            <header className="app-header">
                <MdAccountCircle size="24" />
                <button onClick={this.props.signOut}>Logout</button>
            </header>
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