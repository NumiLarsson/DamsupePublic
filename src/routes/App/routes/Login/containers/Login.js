import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import api from 'api/Api';
import { animateErrorButton } from 'utils/animations';

//Components
import LoginForm from '../components/LoginForm';
import RedirectLoader from '../components/RedirectLoader';
import RedirectError from '../components/RedirectError';

//Actions
import {setRedirectError, setRedirectLoading, setNoRedirect, setLoading, setDoneLoading} from 'actions/login';
import { navigateOrGoBack } from 'actions/app';

//Styles
import styles from './styles/Login.css';
import buttons from 'styles/buttons.css';
import spinners from 'styles/spinners.css';
import margins from 'styles/margins.css';


class LoginScreen extends Component {

    constructor() {
        super()
        this.signInEmail = this.signInEmail.bind(this);
        this.signInFacebook = this.signInFacebook.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentWillMount() {
        this.props.setDoneLoading();
        api.auth.getRedirectResult()
        .then(res => {
            if (res.user && !this.props.userSignedOut) {
                this.props.navigateOrGoBack('/app/eventlist');
            } else {
                this.props.setNoRedirect();
            }
        })
        .catch(err => {
            if (!this.props.userSignedOut) {
                this.props.setRedirectError(err);
            } 
        }) 
    }
    
    signInFacebook(event) {
        api.auth.signInWithFacebookRedirect();
    }

    signInEmail (values) {
        this.props.setLoading();
        const { email, password } = values;
        return api.auth.signInWithEmail(email, password)
        .then(user => {
            this.props.navigateOrGoBack('/app/eventlist');
        })
        .catch((e) => { 
            throw new SubmissionError({ _error: e }); 
        });
    }

    handleError() {
        this.props.setDoneLoading();
        animateErrorButton("#loginBtn");
    }
    

    render() {
        return (
            <div className={styles.loginScreen}>
                {this.props.redirectLoading && 
                    <RedirectLoader>
                        <div className={spinners.spinner}>
                                <div className={spinners.dot1}></div>
                                <div className={spinners.dot2}></div>
                        </div>
                    </RedirectLoader>
                }
                <div className={styles.loginScreenHeader}>
                    <h1 className={styles.loginScreenHeaderTitle}>Welcome!</h1>
                </div>
                <div className={styles.loginScreenFormWrapper}>
                    <LoginForm onSubmit={this.signInEmail} onSubmitFail={this.handleError} loading={this.props.loading} />
                    <button id="facebookBtn" onClick={this.signInFacebook} className={[buttons.flatButtonFacebook, margins.spaced5].join(' ')}>USE FACEBOOK</button>
                    {this.props.redirectError ? <RedirectError error={this.props.redirectErrorMsg}/> : null}
                </div> 
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        redirectError: state.login.get('redirectError'),
        redirectErrorMsg: state.login.get('redirectErrorMsg'),
        redirectLoading: state.login.get('redirectLoading'),
        userSignedOut: state.login.get('userSignedOut'),
        loading: state.login.get('loading')
    }
}

const mapDispatchToProps = {
    setRedirectError,
    setRedirectLoading,
    setNoRedirect,
    setLoading,
    setDoneLoading,
    navigateOrGoBack
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);