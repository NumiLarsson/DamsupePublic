import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import LoginForm from './LoginForm';
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
            if (res) {
                console.log('User is signed in');
            } else {
                console.log('User canceled or something');
            }
        })
        .catch(err => {
            console.log(err);
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
                <a className="register-link" href="/register">Register</a>
                <div className="login-screen__header">
                    <h1 className="login-screen__header__title">Welcome!</h1>
                </div>
                <div className="login-screen__form__wrapper">
                    <LoginForm onSubmit={this.signInEmail} onSubmitFail={this.handleError} />
                    <button onClick={api.signInWithFacebook} className="flat-button flat-button--facebook spaced-item">Use Facebook</button>
                </div> 
            </div>
        )
    }

}

export default connect(null, null)(LoginScreen);