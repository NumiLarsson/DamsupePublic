import React from 'react';
import './styles/Loader.css';

export default (props) => {
    return (
        <div className="loader__overlay">
            {props.children}
        </div>
    )
}