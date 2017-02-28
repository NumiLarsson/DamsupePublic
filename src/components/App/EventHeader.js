import React from 'react';
import styles from './Header.css';
import List from 'react-icons/lib/md/list';
import { Link } from 'react-router';

export default props => {
    return (
        <div className={styles.eventHeader}>
            <div className={styles.eventTitleSection}>
                <h2>{props.title}</h2>
            </div>
            <nav className={styles.controlPanel}>
                {!props.loading && <Link to="/app/eventlist"><List style={{marginRight: '5px'}} color="#fff" size="32" /></Link>}
                {!props.isAuthenticated && !props.loading && <Link className={styles.loginLink} to="/app/login">LOGIN</Link>}
            </nav>
        </div>
    )
}