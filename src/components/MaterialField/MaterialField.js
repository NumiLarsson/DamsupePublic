import React from 'react';

//TODO: Use css modules
import styles from './MaterialField.css';

const base = styles.materialLabel; 
const raised = styles.materialLabelRaised;

export default ({color, input, label, type, fieldId, placeholder, meta: {touched, valid, error, active } }) => {
    return (
        <div className={styles.inputContainer} style={{color: color}}>
            <input
                {...input}
                id={fieldId} 
                className={error && touched ? (styles.materialField +  ' error') : styles.materialField} 
                type={type} />
            <label className={getLabelClassName(input.value, active)} htmlFor={fieldId}>{label} </label>
            <div className={styles.materialBar}>
                {touched && error && <span className={styles.materialFieldError}>{error}</span>}
            </div>
            
        </div>
    );
}

function getLabelClassName(value, active, classes) {
    return value || active ? `${base} ${raised}` : `${base}`;
}