import React from 'react';
import styles from './styles/EventListItem.css';
import { Link } from 'react-router';
import Pick from 'react-icons/lib/md/chevron-right';

export default props => {
    const { name, active, eventId } = props;
    return (
        <Link className={styles.eventLink} to={`/main/event/${eventId}`}>
            <li className={styles.eventListItem}>
                <div className={styles.itemContent}>
                    <h3>{name}</h3>
                    <span className={styles.divider} />
                </div>
            </li>
        </Link>
    )
}