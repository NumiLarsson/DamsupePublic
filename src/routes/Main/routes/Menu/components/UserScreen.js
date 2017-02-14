import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import api from '../../../../../api/Api';
import './styles/UserScreen.css';
import { fadeIn } from '../../../../../utils/animations';
import UserScreenForm from './UserScreenForm';

class UserScreen extends Component {

    constructor() {
        super();
        this.saveUserData = this.saveUserData.bind(this);
        this.handleSaveError = this.handleSaveError.bind(this);
    }

    componentDidMount() {
        fadeIn(this.userScreen, 0, 1);
    }

    saveUserData(values) {
        const { uid, currentEvent } = this.props;
        api.events.saveUserData(currentEvent, uid, values)
        .then(() => {
            console.log('SUCCESS');
        })
        .catch(err => {
            throw new SubmissionError({ _error: err }); 
        })
    }

    handleSaveError() {
        
    }

    render() {
        return (
            <div className="screen" ref={(r) => this.userScreen = r}>
                <div className="screen-content">
                    <UserScreenForm onSubmit={this.saveUserData} onSubmitFailed={this.handleSaveError} />
                </div>
            </div>
        )
    }
}


export default connect(null, null)(UserScreen);