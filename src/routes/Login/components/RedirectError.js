import React from 'react';

//TODO: Use css modules
import styles from './styles/RedirectError.css';
import margins from 'styles/margins.css';


export default (props) => {
    return (
        <div className={[styles.redirectError, margins.spaced20].join(' ')}> 
            {props.error}
        </div>
    )
}