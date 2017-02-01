import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import LoginForm from '../components/forms/login_form';
import api from '../libs/api';
import { signInWithEmail } from '../actions/login';
import './styles/login_screen.css';
import '../components/styles/flat_button.css';
import TweenMax from 'gsap';

class LoginScreen extends Component {

    constructor() {
        super()
        this.signInEmail = this.signInEmail.bind(this);
        this.handleError = this.handleError.bind(this);
    }

 
    signInEmail (values) {
        const { email, password } = values;
        return api.signInWithEmail(email, password)
        .catch((e) => { throw new SubmissionError({ _error: e.message }); });
    }

    handleError(error, dispatch, submitError, props) {
        TweenMax.to("#loginBtn", 2, {
            backgroundColor: "#e74c3c"
        });
    }
    

    render() {
        return (
            <div className="login-screen">
                <a className="register-link" href="/register">Register</a>
                <div className="login-screen__header">
                    <h1 className="login-screen__header__title">Welcome!</h1>
                </div>
                <div className="login-screen__form__wrapper">
                    <LoginForm onSubmit={this.signInEmail} onSubmitFail={this.handleError} />
                    <button className="flat-button flat-button--facebook spaced-item">Use Facebook</button>
                </div> 
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loginError: state.login.error,
        loginErrorMessage: state.login.errorMessage
    }
}

const mapDispatchToProps = {
    signInWithEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);