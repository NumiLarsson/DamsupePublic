import React from 'react';
import './styles/InputField.css';

export default (props) => {
    return (
        <div className="input-field__wrapper">
            <label htmlFor={props.fieldId}>{props.label} </label>
            <input
                id={props.fieldId} 
                className="input-field" 
                autoComplete={props.name} 
                type={props.type} 
                name={props.name}
                required={props.required}
                value={props.input.value}
                onChange={props.input.onChange} 
                placeholder={props.placeholder}
                />
        </div>
    );
}