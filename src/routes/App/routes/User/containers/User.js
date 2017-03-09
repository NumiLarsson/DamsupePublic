import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import api from 'api/Api';
import { animateSuccessButton, animateErrorButton } from 'utils/animations';
import {userScreenLoading, userScreenDoneLoading} from 'actions/userscreen';
import UserScreenForm from '../components/UserScreenForm';
import styles from './styles/User.css';

class UserScreen extends Component {

    constructor() {
        super();
        this.saveUserData = this.saveUserData.bind(this);
        this.handleSaveError = this.handleSaveError.bind(this);
    }

    saveUserData(values) {
        let self = this;
        self.props.userScreenLoading();
        const { userId } = this.props;
        const { name } = values;
        api.user.updateUserData(userId, {name}, () => {
            animateSuccessButton(document.getElementById("saveBtn"), 'SUCCESS', () => {
                self.props.userScreenDoneLoading();
            });
        });
    }

    handleSaveError(error) {
        this.props.userScreenDoneLoading();
        animateErrorButton("#saveBtn");
    }

    render() {
        return (
             <div className={styles.userScreen}>
                 <div className={styles.userScreenFormWrapper}>
                    <UserScreenForm onSubmit={this.saveUserData} onSubmitFail={this.handleSaveError} />`
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        userId: state.auth.get('uid')
    }
}

const mapDispatchToProps =  {
    userScreenLoading,
    userScreenDoneLoading
}



module.exports = connect(mapStateToProps, mapDispatchToProps)(UserScreen);