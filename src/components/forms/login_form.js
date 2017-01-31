import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from './input_field';

class LoginForm extends Component {

    render() {

        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit} className="login-screen__form">
                <Field type="email" name="email" component={InputField} label="Email"/>
                <Field type="password" name="password" component={InputField} label="Password" />
                <button type="submit"
                    disabled={pristine || submitting}
                    className="flat-button flat-button--primary spaced-item">Sign In</button>
            </form>
        )
    }
}

LoginForm = reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm);

export default LoginForm;
