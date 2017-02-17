import React from 'react';
import { Link } from 'react-router'

//TODO: Use css modules.
import styles from './styles/Home.css';

function HomeScreen(props) {
    return (
        <div className={styles.homeScreen}>
            <h1>DAMSUPE VT17</h1>
            <div className={styles.divider}>
            </div>
            <nav className={styles.nav}>
                <div className={styles.linkWrapper}>
                    <Link to="/register" className={styles.emphesizedLink}>JOIN</Link>
                </div>
                <span className={styles.verticalDivider}></span>
                <div className={styles.linkWrapper}>
                    <Link to="/login" className={styles.emphesizedLink}>LOGIN</Link>
                </div>
            </nav>
        </div>
    )
}

module.exports = HomeScreen;