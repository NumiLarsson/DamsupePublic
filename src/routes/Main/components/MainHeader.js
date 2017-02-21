import React from 'react';
import styles from './styles/MainHeader.css';
import Settings from 'react-icons/lib/md/settings';

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
                <Settings color="#fff" size="32" onClick={signOut} />
            </nav>
        </header>
    )
}

//<Settings color="#fff" size="32" onClick={signOut} />