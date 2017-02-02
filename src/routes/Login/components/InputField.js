import React from 'react';
import './styles/InputField.css';

export default (props) => {
    return (
        <div className="input-field__wrapper">
            <label htmlFor={props.name}>{props.label} </label>
            <input 
                className="input-field" 
                autoComplete={props.name} 
                type={props.type} 
                name={props.name}
                value={props.input.value}
                onChange={props.input.onChange} 
                placeholder={props.placeholder}
                />
        </div>
    );
}