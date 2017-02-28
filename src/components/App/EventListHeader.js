import React from 'react';
import styles from './Header.css';
import { Link } from 'react-router';

export default props => {
    return (
        <div className={styles.eventListHeader}>
            <div className={styles.eventTitleSection}>
                    <h2>{props.title}</h2>
            </div>
            {!props.isAuthenticated && !props.loading && <Link className={styles.loginLink} to="/app/login">LOGIN</Link>}
        </div>
    )
}