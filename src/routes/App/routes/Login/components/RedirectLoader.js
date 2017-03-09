import React from 'react';

//TODO: Use css modules
import styles from './styles/RedirectLoader.css';

export default props => {
    return (
        <div className={styles.redirectLoader}>
            {props.children}
        </div>
    )
}