import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import MaterialField from 'components/MaterialField/MaterialField';
import buttons from 'styles/buttons.css';
import margins from 'styles/margins.css';

import styles from './styles/UserScreenForm.css';

let UserScreenForm = (props) => {
    let { handleSubmit, submitFailed, error, submitting, loading } = props;
    return (
        <form onSubmit={handleSubmit} className={styles.UserScreenForm} autoComplete="off">
            <Field type="name" color="#34495e" name="name" fieldId="usrName" component={MaterialField} label="Name"/>
            <button type="submit" 
                id="saveBtn" 
                disabled={submitting || loading}
                className={[buttons.flatButtonPrimary, margins.spaced30].join(' ')}>
                {submitting || loading ? 'SAVE' : (submitFailed && error ?  error : 'SAVE')}
            </button>
        </form>
    )
}
 

UserScreenForm = reduxForm({
  form: 'userData'
})(UserScreenForm);

UserScreenForm = connect(state => (
    {initialValues: {
        name: state.auth.get('name')
    },
    loading: state.userscreen.get('userScreenLoading')}))(UserScreenForm);

export default UserScreenForm;