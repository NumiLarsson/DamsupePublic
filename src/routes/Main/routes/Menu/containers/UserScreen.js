import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import api from '../../../../../api/Api';
import { fadeIn, animateSuccessButton, animateErrorButton } from '../../../../../utils/animations';
import {userScreenLoading, userScreenDoneLoading} from '../actions/main';
import UserScreenForm from '../components/UserScreenForm';

//TODO: Use css modules
require('./styles/UserScreen.css');

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
        let self = this;
        self.props.userScreenLoading();
        const { uid, currentEvent } = this.props;
        api.events.saveUserData(currentEvent, uid, values)
        .then(() => {
            animateSuccessButton(document.getElementById("saveBtn"), 'SUCCESS', () => {
                self.props.userScreenDoneLoading();
            });
        })
        .catch(err => {
            throw new SubmissionError({ _error: err }); 
        })
    }

    handleSaveError(error) {
        this.props.userScreenDoneLoading();
        animateErrorButton("#saveBtn");
    }

    render() {
        return (
            <div className="screen" ref={(r) => this.userScreen = r}>
                <div className="screenContent">
                    <UserScreenForm onSubmit={this.saveUserData} onSubmitFail={this.handleSaveError} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    userScreenLoading,
    userScreenDoneLoading
}

export default connect(null, mapDispatchToProps)(UserScreen);