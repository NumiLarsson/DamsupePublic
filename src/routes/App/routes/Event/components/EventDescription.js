import React from 'react';
import styles from './styles/EventDescription.css';

export default ({description}) => {
    return (
        <section className={styles.descriptionSection}>
           {description.split('\\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
                })}
        </section>
    )
}

function formatDescription(description) {
    return description.split("\\n").join("&#10;");
}