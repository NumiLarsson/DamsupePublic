import React, {Component} from 'react';
import { connect } from 'react-redux';
import InputField from '../components/input_field';
import { signInWithEmail, updateEmail, updatePassword } from '../actions/login';
import './styles/login_screen.css';
import '../components/styles/flat_button.css';
import TweenMax from 'gsap';

class LoginScreen extends Component {

    constructor() {
        super();
        this.updateEmailValue = this.updateEmailValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);
        this.signInEmail = this.signInEmail.bind(this);
    }

    updateEmailValue(e) {
        this.props.updateEmail(e.target.value);
    }

    updatePasswordValue(e) {
        this.props.updatePassword(e.target.value);
    }

    signInEmail(e) {
        e.preventDefault();
        this.props.signInWithEmail(this.props.email, this.props.password);
    }

    /* Animate error stuff */
    /*
    componentWillReceiveProps(newProps) {
        if (newProps.loginError) {
            this.handleLoginError();
        }
    }

    handleLoginError() {
        TweenMax.to(this.loginB, 0.05, {x:"+=5", yoyo:true, repeat:3});
        TweenMax.to(this.loginB, 0.05, {x:"-=5", yoyo:true, repeat:3});
        this.props.resetError();
    }
    */ 

    render() {
        return (
            <div className="login-screen">
                <a className="register-link" href="/register">Register</a>
                <div className="login-screen__header">
                    <h1 className="login-screen__header__title">Welcome!</h1>
                </div>
                <form className="login-screen__form">
                    <InputField type="email" name="email" label="Email" value={this.props.email} onInput={this.updateEmailValue}  />
                    <InputField type="password" name="password" label="Password" value={this.props.password} onInput={this.updatePasswordValue}   />
                    <button 
                        ref={(loginB) => {this.loginB = loginB}}
                        onClick={this.signInEmail} 
                        className="flat-button flat-button--primary spaced-item">Sign In</button>
                    <button className="flat-button flat-button--facebook spaced-item">Use Facebook</button>
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        email: state.login.email,
        password: state.login.password,
        loginError: state.login.error,
        loginErrorMessage: state.login.errorMessage
    }
}

const mapDispatchToProps = {
    signInWithEmail,
    updateEmail,
    updatePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);