import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import InputField from '../../../../../components/InputField';

/*
function scrollTo(event) {
    event.target.scrollIntoView(true);
}*/

let UserScreenForm = (props) => {
    const { handleSubmit, submitFailed, error, pristine, submitting, loading } = props;
    return (
        <form onSubmit={handleSubmit} className="user-screen__form">
            <Field fieldId="userName" required type="text" name="name" placeholder="Name" component={InputField} label="Name"/>
            <Field fieldId="tableNr" required type="text" name="table" placeholder="Table" component={InputField} label="Table"/>
            <button type="submit" 
                id="saveBtn" 
                disabled={pristine || submitting || loading}
                className="text-button user-screen__form--button spaced-item-x3">
                SAVE
            </button>
        </form>
    )
}
 

UserScreenForm = reduxForm({
  form: 'user'
})(UserScreenForm);

UserScreenForm = connect(state => (
    {initialValues: {
        name: state.auth.name, 
        table: state.event.userData.table
    }}))(UserScreenForm);

export default UserScreenForm;