import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../../components/InputField';

class LoginForm extends Component {

    render() {

        const { handleSubmit, submitFailed, error, pristine, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit} className="login-screen__form">
                <Field fieldId="logName" type="email" name="email" component={InputField} label="Email"/>
                <Field fieldId="logPwd" type="password" name="password" component={InputField} label="Password" />
                <button type="submit" 
                    id="loginBtn" 
                    disabled={pristine || submitting}
                    className="flat-button spaced-item flat-button--primary">
                    {submitting ? 'Loading' : (submitFailed ?  error : 'Sign In')}
                </button>
            </form>
        )
    }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);


export default LoginForm;
