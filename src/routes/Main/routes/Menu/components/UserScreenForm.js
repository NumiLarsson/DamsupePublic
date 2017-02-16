import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import InputField from '../../../../../components/InputField';


export const Bounce = (<div className="button-spinner"><div className="double-bounce1"></div><div className="double-bounce2"></div></div>);

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
    let { handleSubmit, submitFailed, error, pristine, submitting, loading } = props;
    return (
        <form onSubmit={handleSubmit} className="user-screen__form">
            <Field fieldId="userName" required type="text" name="name" placeholder="Name" component={InputField} label="Name"/>
            <Field fieldId="tableNr" required type="text" name="table" placeholder="Table" component={InputField} label="Table"/>
            <button type="submit" 
                id="saveBtn" 
                disabled={submitting || loading}
                className="flat-button flat-button--primary spaced-item-x3 ">
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