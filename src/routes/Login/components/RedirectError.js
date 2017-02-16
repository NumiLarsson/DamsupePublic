import React from 'react';

//TODO: Use css modules
import './styles/RedirectError.css';


export default (props) => {
    return (
        <div className="redirectError spaced-item-x2"> 
            {props.error}
        </div>
    )
}