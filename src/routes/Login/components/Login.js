import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
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
        //let btn = document.getElementById('facebookBtn');
        //rippleAnimation(btn, event, 0.75);
    }

    signInEmail (values) {
        const { email, password } = values;
        return api.auth.signInWithEmail(email, password)
        .catch((e) => { throw new SubmissionError({ _error: e }); });
    }

    handleError() {
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
                <div className="login-screen__header">
                    <h1 className="login-screen__header__title">Welcome!</h1>
                </div>
                <div className="login-screen__form__wrapper">
                    <LoginForm onSubmit={this.signInEmail} onSubmitFail={this.handleError} />
                    <button id="facebookBtn" onClick={this.signInFacebook} className="flat-button flat-button--facebook spaced-item">Use Facebook</button>
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
        userSignedOut: state.login.userSignedOut
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRedirectError: (msg) => dispatch({type: 'REDIRECT_ERROR', payload: msg}),
        setRedirectLoading: () => dispatch({type: 'REDIRECT_LOADING'}),
        setNoRedirect: () => dispatch({type: 'NO_REDIRECT'})
    }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);