import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import Save from 'react-icons/lib/md/save';
import InputField from '../../../../../components/InputField';


function scrollTo(event) {
    event.target.scrollIntoView(true);
}

let UserScreenForm = (props) => {
    const { handleSubmit, submitFailed, error, pristine, submitting, loading } = props;
    return (
        <form onSubmit={handleSubmit} className="user-screen__form">
            <Field onFocus={scrollTo} fieldId="userName" type="text" name="name" component={InputField} label="Name"/>
            <Field onFocus={scrollTo} fieldId="tableNr"  type="text" name="table" component={InputField} label="Table"/>
            <button type="submit" 
                id="saveBtn" 
                disabled={pristine || submitting || loading}
                className="text-button user-screen__form--button spaced-item-x2">
                SAVE
            </button>
        </form>
    )
}
 

UserScreenForm = reduxForm({
  form: 'user'
})(UserScreenForm);

UserScreenForm = connect(state => ({initialValues: state.auth}))(UserScreenForm);

export default UserScreenForm;