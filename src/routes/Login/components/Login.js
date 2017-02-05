import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Link } from 'react-router';
import LoginForm from './LoginForm';
import RedirectLoader from './RedirectLoader';
import RedirectError from './RedirectError';
import HourGlass from '../../../components/HourGlass';
import api from '../../../libs/api';
import './styles/Login.css';
import './styles/FlatButton.css';
import TweenMax from 'gsap';

class LoginScreen extends Component {

    constructor() {
        super()
        this.signInEmail = this.signInEmail.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentWillMount() {
        api.getRedirectResult()
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
 
    signInEmail (values) {
        const { email, password } = values;
        return api.signInWithEmail(email, password)
        .catch((e) => { throw new SubmissionError({ _error: e }); });
    }

    handleError(error, dispatch, submitError, props) {
        
        TweenMax.to("#loginBtn", 1, {
            backgroundColor: "#e74c3c"
        }); 
        TweenMax.to("#loginBtn", .1, {
            x: -7,
            ease: TweenMax.Quad.easeInOut
        });
        TweenMax.to("#loginBtn", .1, {
            repeat: 4,
            x: 7,
            yoyo: true,
            delay: .1,
            ease: TweenMax.Quad.easeInOut
        });
        TweenMax.to("#loginBtn", .1, {
            x: 0,
            delay: .1 * 4
        });
    }
    

    render() {
        return (
            <div className="login-screen">
                {this.props.redirectLoading ? <RedirectLoader><HourGlass width="80" height="80" /></RedirectLoader> : null}
                <Link className="register-link" to="/register">Register</Link>
                <div className="login-screen__header">
                    <h1 className="login-screen__header__title">Welcome!</h1>
                </div>
                <div className="login-screen__form__wrapper">
                    <LoginForm onSubmit={this.signInEmail} onSubmitFail={this.handleError} />
                    <button onClick={api.signInWithFacebook} className="flat-button flat-button--facebook spaced-item">Use Facebook</button>
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