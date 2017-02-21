import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import MaterialField from 'components/MaterialField/MaterialField';
import buttons from 'styles/buttons.css';
import margins from 'styles/margins.css';

//TODO: Use css modules
import styles from './styles/UserScreenForm.css';

const validate = values => {
    const errors = {};

    if(!values.name) {
        errors.name = 'Required';
    } else if(values.name.length > 100) {
        errors.name = '100 characters max';
    }

    return errors;
}

let UserScreenForm = (props) => {
    let { handleSubmit, submitFailed, error, submitting, loading } = props;
    return (
        <form onSubmit={handleSubmit} className={styles.UserScreenForm} autoComplete="off">
            <Field fieldId="userName" required type="text" name="name" placeholder="Name" component={MaterialField} label="Name"/>
            <Field fieldId="tableNr" autocomplete="off" required type="text" name="table" placeholder="Table" component={MaterialField} label="Table"/>
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
  form: 'user',
  validate
})(UserScreenForm);

UserScreenForm = connect(state => (
    {initialValues: {
        name: state.auth.name, 
        table: state.event.userData.table
    },
    loading: state.main.userScreenLoading}))(UserScreenForm);

export default UserScreenForm;