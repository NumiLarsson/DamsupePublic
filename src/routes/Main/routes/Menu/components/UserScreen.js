import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import api from '../../../../../api/Api';
import './styles/UserScreen.css';
import { fadeIn, animateSuccessButton, animateErrorButton } from '../../../../../utils/animations';
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
        let self = this;
        self.props.dispatch({type: 'USER_SCREEN_LOADING', payload: true});
        const { uid, currentEvent } = this.props;
        api.events.saveUserData(currentEvent, uid, values)
        .then(() => {
            animateSuccessButton(document.getElementById("saveBtn"), 'SUCCESS', () => {
                self.props.dispatch({type: 'USER_SCREEN_LOADING', payload: false});
            });
        })
        .catch(err => {
            throw new SubmissionError({ _error: err }); 
        })
    }

    handleSaveError(error) {
        this.props.dispatch({type: 'USER_SCREEN_LOADING', payload: false});
        animateErrorButton("#saveBtn");
    }

    render() {
        return (
            <div className="screen" ref={(r) => this.userScreen = r}>
                <div className="screen-content">
                    <UserScreenForm onSubmit={this.saveUserData} onSubmitFail={this.handleSaveError} />
                </div>
            </div>
        )
    }
}

export default connect(null, null)(UserScreen);