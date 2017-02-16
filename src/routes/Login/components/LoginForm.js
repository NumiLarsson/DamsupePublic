import React from 'react';
import { Field, reduxForm } from 'redux-form';
import MaterialField from '../../../components/MaterialField';

const LoginForm = (props) => {
    const { handleSubmit, submitFailed, error, pristine, submitting, loading } = props;
    return (

        <form onSubmit={handleSubmit} className="loginForm">
            <Field fieldId="logName" required type="email" name="email" component={MaterialField} label="Email"/>
            <Field fieldId="logPwd" required type="password" name="password" component={MaterialField} label="Password" />
            <button type="submit" 
                id="loginBtn" 
                disabled={pristine || submitting || loading}
                className="flat-button spacedItem30 flat-button--primary">
                {submitting || loading ? 'Loading' : (submitFailed && error ?  error : 'SIGN IN')}
            </button>
        </form>
    )
}

export default reduxForm({
  form: 'login'
})(LoginForm);