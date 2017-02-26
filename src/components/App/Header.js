import React from 'react';
import styles from './Header.css';
import Settings from 'react-icons/lib/md/settings';
import EventHeader from './EventHeader';
import EventListHeader from './EventListHeader';

export default props => {
    let {signOut, show, currentEvent, eventIsChosen, location} = props;
    const path = location.pathname;
    return (
        <header id="mainHeader" className={show ? `${styles.mainHeader} ${styles.show}` : styles.mainHeader}>
            {path === '/main/eventlist' ? <EventListHeader title={'Choose Event'} /> : <EventHeader title={currentEvent}/>}
            <Settings color="#fff" size="32" onClick={signOut} />
        </header>
    )
}