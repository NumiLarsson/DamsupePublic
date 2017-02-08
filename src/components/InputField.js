import React from 'react';
import './styles/InputField.css';

export default ({input, label, type, fieldId, placeholder, meta: { touched, error } }) => {
    return (
        <div className="input-field__wrapper">
            <label htmlFor={fieldId}>{label} </label>
            <input
                {...input}
                id={fieldId} 
                className={error && touched ? "input-field error" : "input-field"} 
                type={type} 
                placeholder={placeholder}/>
                {touched && error && <span className="input-field__error">{error}</span>}
        </div>
    );
}