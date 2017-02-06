import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import HourGlass from '../../../components/HourGlass';
import RegisterForm from './RegisterForm';
import api from '../../../libs/api';
import './styles/Register.css';
import { Link } from 'react-router';

class RegisterScreen extends Component {


    createUser(values) {
        const { email, password, password2 } = values;
        
    }

    render() {
        return (
             <div className="register-screen">
                <Link className="login-link" to="/login">Back</Link>
                <div className="register-screen__header">
                    <h1 className="register-screen__header__title">Register!</h1>
                </div>
                <div className="register-screen__form__wrapper">
                    <RegisterForm onSubmit={this.createUser} />
                </div> 
            </div>

        )
    }

}


module.exports = connect(null, null)(RegisterScreen);