import React from 'react';
import styles from './Header.css';
import Settings from 'react-icons/lib/md/settings';
import EventHeader from './EventHeader';
import EventListHeader from './EventListHeader';
import BaseHeader from './BaseHeader';

export default props => {
    let {signOut, show, currentEvent, location} = props;
    const path = location.pathname;
    return (
        <header id="mainHeader" className={show ? `${styles.mainHeader} ${styles.show}` : styles.mainHeader}>
            {getHeader(location, currentEvent)}
            <Settings className={styles.headerButton} color="#fff" size="32" onClick={signOut} />
        </header>
    )
}

function getHeader(location, currentEvent) {
    let paths = location.pathname.split('/');
    switch(paths[2]) {
        case 'eventlist':
            return <EventListHeader title={'Choose Event'} />;
        case 'event':
            return <EventHeader title={currentEvent}/>;
        default:
            return <BaseHeader />;
    }

}