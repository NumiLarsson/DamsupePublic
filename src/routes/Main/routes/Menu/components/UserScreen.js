import React, {Component} from 'react';
import { connect } from 'react-redux';
import './styles/UserScreen.css';
import { fadeIn } from '../../../../../utils/animations';
import UserScreenForm from './UserScreenForm';

class UserScreen extends Component {

    componentDidMount() {
        fadeIn(this.userScreen, 0, 1);
    }

    render() {
        return (
            <div className="screen" ref={(r) => this.userScreen = r}>
                <div className="screen-content">
                    <UserScreenForm />
                </div>
            </div>
        )
    }
}


export default connect(null, null)(UserScreen);