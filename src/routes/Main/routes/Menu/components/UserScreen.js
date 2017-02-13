import React, {Component} from 'react';
import { connect } from 'react-redux';
import './styles/UserScreen.css';
import { fadeIn } from '../../../../../utils/animations';
import { signOut } from '../actions/user';
import UserScreenForm from './UserScreenForm';

class UserScreen extends Component {

    componentDidMount() {
        fadeIn(this.userScreen, 0, 1);
    }

    render() {
        return (
            <div id="userScreen" className="screen user-screen" ref={(r) => this.userScreen = r}>
                <div className="screen-content user-screen__content">
                    <div className="user-screen__form-wrapper">
                        <UserScreenForm />
                    </div>
                    <button onClick={this.props.signOut} className="flat-button flat-button--primary spaced-item-x3">
                        LOGOUT
                    </button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signOut
}

export default connect(null, mapDispatchToProps)(UserScreen);