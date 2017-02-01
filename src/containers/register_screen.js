import React, {Component} from 'react';
import { connect } from 'react-redux';

class RegisterScreen extends Component {
    render() {
        return (
            <button onClick={this.props.signOut}>Logout</button>
        )
    }
}

export default connect(null, null)(RegisterScreen);