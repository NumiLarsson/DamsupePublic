import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import RegisterForm from '../components/RegisterForm';
import api from 'api/Api';
import { animateErrorButton } from 'utils/animations';
import {registerLoading, registerDoneLoading } from 'actions/register';
import { navigateOrGoBack } from 'actions/app';

import styles from './styles/Register.css';

class RegisterScreen extends Component {

    constructor() {
        super();
        this.handleError = this.handleError.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentWillMount() {
        this.props.registerDoneLoading();
    }

    createUser(values) {
        this.props.registerLoading();
        const { email, password, name } = values;
        return api.auth.createUser(email, password)
        .then((user) => {
            user.updateProfile({displayName: name}).then( () => {
                api.user.createUserIfNotExists(user).then( () => {
                    this.props.navigateOrGoBack('/app/eventlist');
                })
            })
        })
        .catch((e) => { throw new SubmissionError({ _error: e }); });
    }

    handleError() {
        this.props.registerDoneLoading();
        animateErrorButton("#registerBtn");
    }

    render() {
        return (
             <div className={styles.registerScreen}>
                <div className={styles.registerScreenHeader}>
                    <h1 className={styles.registerScreenHeaderTitle}>REGISTER</h1>
                </div>
                <div className={styles.registerScreenFormWrapper}>
                    <RegisterForm onSubmit={this.createUser} onSubmitFail={this.handleError} loading={this.props.loading} />
                </div> 
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.register.get('loading')
    }
}

const mapDispatchToProps =  {
    registerLoading,
    registerDoneLoading,
    navigateOrGoBack
}



module.exports = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);