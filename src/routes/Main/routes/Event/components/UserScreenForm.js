import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import MaterialField from 'components/MaterialField/MaterialField';
import buttons from 'styles/buttons.css';
import margins from 'styles/margins.css';

//TODO: Use css modules
import styles from './styles/UserScreenForm.css';

let UserScreenForm = (props) => {
    let { handleSubmit, submitFailed, error, submitting, loading } = props;
    return (
        <form onSubmit={handleSubmit} className={styles.UserScreenForm} autoComplete="off">
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
  form: 'userEventData'
})(UserScreenForm);

UserScreenForm = connect(state => (
    {initialValues: {
        table: state.event.event.get('userData').get('table')
    },
    loading: state.event.userscreen.get('userScreenLoading')}))(UserScreenForm);

export default UserScreenForm;