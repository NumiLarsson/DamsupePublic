import React, {Component} from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/forms/login_form';
import { signInWithEmail } from '../actions/login';
import './styles/login_screen.css';
import '../components/styles/flat_button.css';

class LoginScreen extends Component {

    constructor() {
        super()
        this.signInEmail = this.signInEmail.bind(this);
    }

    signInEmail (values) {
        const { email, password } = values;
        this.props.signInWithEmail(email, password);
    }

    render() {
        return (
            <div className="login-screen">
                <a className="register-link" href="/register">Register</a>
                <div className="login-screen__header">
                    <h1 className="login-screen__header__title">Welcome!</h1>
                </div>
                <div className="login-screen__form__wrapper">
                    <LoginForm onSubmit={this.signInEmail} />
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