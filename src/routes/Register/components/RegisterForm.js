import React from 'react';
import { Field, reduxForm } from 'redux-form';
import MaterialField from '../../../components/MaterialField';

//TODO: Use css modules. 
require('./styles/RegisterForm.css');

function isValidPassword(password) {
    return password.length >= 6;
} 

const validate = values => {

    const errors = {}

    if(!values.email) {
        errors.email = 'Required';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }
    else if (!isValidPassword(values.password)) {
        errors.password = 'The password is not strong enough';
    }

    if (!values.password2) {
        errors.password2 = 'Required';
    }
    else if (values.password2 !== values.password) {
        errors.password2 = 'The passwords does not match';
    }
    return errors;
}

const RegisterForm = (props) => {

    const { handleSubmit, submitFailed, error, pristine, submitting, loading } = props;
    return (
        <form onSubmit={handleSubmit} className="registerForm">
            <Field type="email" name="email" fieldId="regEmail" component={MaterialField} label="Email"/>
            <Field type="password" name="password" fieldId="regPwd1" component={MaterialField} label="Password" />
            <Field type="password" name="password2" fieldId="regPwd2" component={MaterialField} label="Type password again" />
            <button type="submit" 
                id="registerBtn" 
                disabled={pristine || submitting || loading}
                className="flat-button spacedItem30 flat-button--primary">
                {submitting || loading ? 'Loading' : (submitFailed && error ?  error : 'Register')}
            </button>
         </form>
    );
};


export default reduxForm({
  form: 'register',
  validate
})(RegisterForm);