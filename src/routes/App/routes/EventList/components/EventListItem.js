import React from 'react';
import styles from './styles/EventListItem.css';
import { Link } from 'react-router';

export default props => {
    const { name, eventId } = props;
    return (
        <Link className={styles.eventLink} to={`/app/event/${eventId}`}>
            <li className={styles.eventListItem}>
                <div className={styles.itemContent}>
                    <h3>{name}</h3>
                    <span className={styles.divider} />
                </div>
            </li>
        </Link>
    )
}