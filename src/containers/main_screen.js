import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/login';

class MainScreen extends Component {
    render() {
        return (
            <button onClick={this.props.signOut}>Logout</button>
        )
    }
}

const mapDispatchToProps = {
    signOut
}

export default connect(null, mapDispatchToProps)(MainScreen);