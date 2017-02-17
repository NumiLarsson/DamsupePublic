import React from 'react';

//TODO: Use css modules
require('./styles/RedirectLoader.css');

export default props => {
    return (
        <div className="redirectLoader">
            {props.children}
        </div>
    )
}