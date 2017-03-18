import React from 'react';
import styles from './styles/EventHeader.css';
import fecha from 'fecha';

export default ({ event }) => {
    let start = event.get('start');
    let end = event.get('end');
    return (
        <header className={styles.infoSection}>
            <img role="presentation" className={styles.headerImage} src={event.get('headerImage')}></img>
            <div className={styles.titleSection}>
                <div className={styles.dateSection}>
                    <span className={styles.month}>
                        {event.get('date') !== 0 && getMonth(event.get('date'))}
                    </span>
                    <span className={styles.day}>
                        {event.get('date') !== 0 && getDay(event.get('date'))}
                    </span>
                </div>
                <div className={styles.nameSection}>
                    <h3>{event.get('name')}</h3>
                </div>
                <div className={styles.timeSection}>
                    <span>{event.get('type')}</span>
                    <span>{start && end && `${start}-${end}`}</span>
                </div>
            </div>
        </header>
    )
}

function getDay(date) {
    const temp = new Date(date);
    return temp.getDate();
}

function getMonth(date) {
    const temp = new Date(date);
    return fecha.format(temp, 'MMM');
}