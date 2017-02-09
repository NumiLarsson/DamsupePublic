import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../../components/InputField';

const LoginForm = (props) => {
    const { handleSubmit, submitFailed, error, pristine, submitting } = props;
    return (

        <form onSubmit={handleSubmit} className="login-screen__form">
            <Field fieldId="logName" required type="email" name="email" component={InputField} label="Email"/>
            <Field fieldId="logPwd" required type="password" name="password" component={InputField} label="Password" />
            <button type="submit" 
                id="loginBtn" 
                disabled={pristine || submitting}
                className="flat-button spaced-item flat-button--primary">
                {submitting ? 'Loading' : (submitFailed && error ?  error : 'Sign In')}
            </button>
        </form>
    )
}

export default reduxForm({
  form: 'login'
})(LoginForm);