import React from 'react';
import './styles/MaterialField.css';

const base = 'materialLabel';
const raised = 'materialLabelRaised';

export default ({input, label, type, fieldId, placeholder, meta: {touched, valid, error, active } }) => {
    return (
        <div className="inputContainer">
            <input
                {...input}
                id={fieldId} 
                className={error && touched ? "materialField error" : "materialField"} 
                type={type} />
            <label className={getLabelClassName(input.value, active)} htmlFor={fieldId}>{label} </label>
            <div className="materialBar">
                {touched && error && <span className="materialFieldError">{error}</span>}
            </div>
            
        </div>
    );
}

function getLabelClassName(value, active) {
    return value || active ? `${base} ${raised}` : `${base}`;
}