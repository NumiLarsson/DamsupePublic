import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../../components/InputField';

class RegisterForm extends Component {

    render() {

        const { handleSubmit, submitFailed, error, pristine, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit} className="register-screen__form">
                <Field type="email" required name="email" fieldId="regEmail" component={InputField} label="Email"/>
                <Field type="password" required name="password" fieldId="regPwd1" component={InputField} label="Password" />
                <Field type="password" required name="password2" fieldId="regPwd2" component={InputField} label="Type password again" />
                <Field type="password" required name="damsupekey" fieldId="regKey" component={InputField} label="Damsupe secret" />

                <button type="submit" 
                    id="registerBtn" 
                    disabled={pristine || submitting}
                    className="flat-button spaced-item flat-button--primary">
                    {submitting ? 'Loading' : (submitFailed ?  error : 'Register')}
                </button>
            </form>
        )
    }
}

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm);


export default RegisterForm;
