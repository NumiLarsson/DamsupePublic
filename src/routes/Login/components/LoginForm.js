import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../../components/InputField';

const LoginForm = (props) => {
    const { handleSubmit, submitFailed, error, pristine, submitting, loading } = props;
    return (

        <form onSubmit={handleSubmit} className="login-screen__form">
            <Field fieldId="logName" required type="email" name="email" component={InputField} label="Email"/>
            <Field fieldId="logPwd" required type="password" name="password" component={InputField} label="Password" />
            <button type="submit" 
                id="loginBtn" 
                disabled={pristine || submitting || loading}
                className="flat-button spaced-item-x3 flat-button--primary">
                {submitting || loading ? 'Loading' : (submitFailed && error ?  error : 'SIGN IN')}
            </button>
        </form>
    )
}

export default reduxForm({
  form: 'login'
})(LoginForm);