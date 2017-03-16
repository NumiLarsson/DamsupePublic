import React from 'react';
import styles from './styles/EventDescription.css';

export default ({description}) => {
    return (
        <section className={styles.descriptionSection}>
            <p>{description}</p>
        </section>
    )
}