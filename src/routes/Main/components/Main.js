import React, {Component} from 'react';
import { connect } from 'react-redux';
import api from '../../../libs/api';

class MainScreen extends Component {
    render() {
        return (
            <button onClick={api.signOut}>Logout</button>
        )
    }
}


export default connect(null, null)(MainScreen);