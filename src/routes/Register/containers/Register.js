import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { goBack } from 'react-router-redux';
import Back from 'react-icons/lib/md/arrow-back';
import RegisterForm from '../components/RegisterForm';
import api from 'api/Api';
import { animateErrorButton } from 'utils/animations';
import {registerLoading, registerDoneLoading } from 'actions/register';

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
        const { email, password } = values;
        return api.auth.createUser(email, password)
        .catch((e) => { throw new SubmissionError({ _error: e }); });
    }

    handleError() {
        this.props.registerDoneLoading();
        animateErrorButton("#registerBtn");
    }

    render() {
        return (
             <div className={styles.registerContent}>
                <span className={styles.backButton} role="button"><Back color="#fff" size="32" onClick={this.props.goBack} /></span>
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
    goBack
}



module.exports = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);