import React from 'react';
import styles from './styles/EventListItem.css';
import { Link } from 'react-router';
import Pick from 'react-icons/lib/md/chevron-right';

export default props => {
    const { name, active, eventId } = props;
    return (
        <li className={styles.eventListItem}>
            <div className={styles.itemContent}>
                <h3>{name}</h3>
                <span className={styles.divider} />
                <Link to={`/main/event/${eventId}`}>
                    <Pick color="#34495e" size="42" />
                </Link>
            </div>
        </li>
    )
}