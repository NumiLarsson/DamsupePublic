import React from 'react';
import styles from './Header.css';
import Settings from 'react-icons/lib/md/settings';
import EventHeader from './EventHeader';
import EventListHeader from './EventListHeader';

export default props => {
    let {signOut, show, currentEvent, eventIsChosen} = props;
    
    return (
        <header id="mainHeader" className={show ? `${styles.mainHeader} ${styles.show}` : styles.mainHeader}>
            {eventIsChosen ? <EventHeader title={currentEvent}/> : <EventListHeader title={'Choose Event'} />}
            <Settings className={styles.headerButton} color="#fff" size="32" onClick={signOut} />
        </header>
    )
}