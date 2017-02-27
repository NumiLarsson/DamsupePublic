import React from 'react';
import styles from './Header.css';


export default props => {
    return (
        <div className={styles.eventListHeader}>
            <div className={styles.eventTitleSection}>
                    <h2>{props.title}</h2>
            </div>
        </div>
    )
}