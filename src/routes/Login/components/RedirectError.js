import React from 'react';
import './styles/RedirectError.css';


export default (props) => {
    return (
        <div className="redirect-error spaced-item-x2"> 
            {props.error}
        </div>
    )
}