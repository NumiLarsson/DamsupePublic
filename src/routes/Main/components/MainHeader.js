import React from 'react';
import styles from './styles/MainHeader.css';
import Settings from 'react-icons/lib/md/settings';
import List from 'react-icons/lib/md/list';

export default props => {
    let {signOut, currentEvent, eventIsChosen} = props;
    return (
        <header id="mainHeader" className={styles.mainHeader}>
            <div className={styles.eventTitleSection}>
                {eventIsChosen && <h2>{currentEvent}</h2>}
                {!eventIsChosen && <h2>Choose Event</h2>}
            </div>
            <span className={styles.divider} />
            <nav className={styles.controlPanel}>
                <List style={{marginRight: '5px'}} color="#fff" size="32" />
                <Settings color="#fff" size="32" onClick={signOut} />
            </nav>
        </header>
    )
}

//<Settings color="#fff" size="32" onClick={signOut} />