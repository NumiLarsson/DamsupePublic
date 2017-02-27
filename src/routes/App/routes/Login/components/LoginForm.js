import React from 'react';
import { Field, reduxForm } from 'redux-form';
import MaterialField from 'components/MaterialField/MaterialField';
import buttons from 'styles/buttons.css';
import margins from 'styles/margins.css';

const LoginForm = (props) => {
    const { handleSubmit, submitFailed, error, pristine, submitting, loading } = props;
    return (

        <form onSubmit={handleSubmit}>
            <Field fieldId="logName" color="#34495e" required type="email" name="email" component={MaterialField} label="Email"/>
            <Field fieldId="logPwd"  color="#34495e" required type="password" name="password" component={MaterialField} label="Password" />
            <button type="submit" 
                id="loginBtn" 
                disabled={pristine || submitting || loading}
                className={[buttons.flatButtonPrimary, margins.spaced30].join(' ')}>
                {submitting || loading ? 'Loading' : (submitFailed && error ?  error : 'SIGN IN')}
            </button>
        </form>
    )
}

export default reduxForm({
  form: 'login'
})(LoginForm);