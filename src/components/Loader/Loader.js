import React from 'react';

//TODO: Use css modules
import styles from './Loader.css';

export default props => {
    const { show } = props;

    if (show) {
        return (
            <div className={styles.loader}>
                <div className={styles.spinner}>
                    <div className={styles.dot1}></div>
                    <div className={styles.dot2}></div>
                </div>
            </div>
        )
    }
    return null;
}