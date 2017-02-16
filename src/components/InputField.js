import React from 'react';
import './styles/InputField.css';

const base = 'material-label';
const raised = 'material-label--raised';

export default ({input, label, type, fieldId, placeholder, meta: {touched, valid, error, active } }) => {
    return (
        <div className="input-container">
            <input
                {...input}
                id={fieldId} 
                className={error && touched ? "material-field error" : "material-field"} 
                type={type} />
            <label className={getLabelClassName(input.value, active)} htmlFor={fieldId}>{label} </label>
            <div className="material-bar">
                {touched && error && <span className="input-field__error">{error}</span>}
            </div>
            
        </div>
    );
}

function getLabelClassName(value, active) {
    return value || active ? `${base} ${raised}` : `${base}`;
}

/*
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
        {touched && error && <span className="input-field__error">{error}</span>}
    );
}
 */