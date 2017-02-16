import React from 'react';

//TODO: Use css modules
import './styles/RedirectLoader.css';

export default props => {
    return (
        <div className="redirectLoader">
            {props.children}
        </div>
    )
}