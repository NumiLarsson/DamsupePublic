import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { goBack } from 'react-router-redux';
import Back from 'react-icons/lib/md/arrow-back';
import LoginForm from './LoginForm';
import RedirectLoader from './RedirectLoader';
import RedirectError from './RedirectError';
import api from '../../../api/Api';
import './styles/Login.css';
import { animateErrorButton } from '../../../utils/animations';

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
                this.props.setRedirectLoading();
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
            <div className="login-screen">
                {this.props.redirectLoading && 
                    <RedirectLoader>
                        <div className="spinner">
                                <div className="dot1"></div>
                                <div className="dot2"></div>
                        </div>
                    </RedirectLoader>
                }
                <span className="backButton" role="button"><Back color="#fff" size="32" onClick={this.props.goBack} /></span>
                <div className="login-screen__header">
                    <h1 className="login-screen__header__title">Welcome!</h1>
                </div>
                <div className="login-screen__form__wrapper">
                    <LoginForm onSubmit={this.signInEmail} onSubmitFail={this.handleError} loading={this.props.loading} />
                    <button id="facebookBtn" onClick={this.signInFacebook} className="flat-button flat-button--facebook spaced-item">USE FACEBOOK</button>
                    {this.props.redirectError ? <RedirectError error={this.props.redirectErrorMsg}/> : null}
                </div> 
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        redirectError: state.login.redirectError,
        redirectErrorMsg: state.login.redirectErrorMsg,
        redirectLoading: state.login.redirectLoading,
        userSignedOut: state.login.userSignedOut,
        loading: state.login.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRedirectError: (msg) => dispatch({type: 'REDIRECT_ERROR', payload: msg}),
        setRedirectLoading: () => dispatch({type: 'REDIRECT_LOADING'}),
        setNoRedirect: () => dispatch({type: 'NO_REDIRECT'}),
        setLoading: () => dispatch({type: 'LOGIN_LOADING'}),
        setDoneLoading: () => dispatch({type: 'LOGIN_DONE_LOADING'}),
        goBack: () => dispatch(goBack())
    }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);