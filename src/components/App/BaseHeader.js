import React from 'react';
import styles from './Header.css';
import { Link } from 'react-router';
import Back from 'react-icons/lib/md/arrow-back';
import Home from 'react-icons/lib/md/home';

export default props => {
    return (
        <div className={styles.baseHeader}>
            {props.canGoBack && <Back className={styles.backButton} onClick={props.goBack} color="#fff" size="32" />}
            {!props.canGoBack && <Link to="/app/eventlist"><Home color="#fff" size="32" /></Link>}
        </div>
    )
}