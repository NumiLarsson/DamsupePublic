import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import RegisterForm from './RegisterForm';
import api from '../../../api/Api';
import './styles/Register.css';
import { animateErrorButton } from '../../../utils/animations';

class RegisterScreen extends Component {


    createUser(values) {
        const { email, password } = values;
        //throw new SubmissionError({ _error: 'This is error' });
        return api.auth.createUser(email, password)
        .catch((e) => { throw new SubmissionError({ _error: e }); });
    }

    handleError() {
        animateErrorButton("#registerBtn");
    }

    render() {
        return (
             <div className="register-screen">
                <div className="register-screen__header">
                    <h1 className="register-screen__header__title">Register!</h1>
                </div>
                <div className="register-screen__form__wrapper">
                    <RegisterForm onSubmit={this.createUser} onSubmitFail={this.handleError} />
                </div> 
            </div>

        )
    }

}


module.exports = connect(null, null)(RegisterScreen);