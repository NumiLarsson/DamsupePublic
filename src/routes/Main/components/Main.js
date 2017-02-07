import React, {Component} from 'react';
import { connect } from 'react-redux';
import api from '../../../api/Api';

class MainScreen extends Component {
    render() {
        return (
            <button onClick={this.props.signOut}>Logout</button>
        )
    }
}

//TODO: Fix this hack

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => api.auth.signOut().then(()=> {
            dispatch({type: 'USER_SIGNED_OUT'});
        })
    }
}

module.exports = connect(null, mapDispatchToProps)(MainScreen);