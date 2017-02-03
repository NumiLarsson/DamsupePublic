import React from 'react';
import './styles/RedirectLoader.css';

export default props => {
    return (
        <div className="redirect-loader__overlay">
            {props.children}
        </div>
    )
}