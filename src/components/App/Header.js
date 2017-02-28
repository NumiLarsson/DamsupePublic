import React from 'react';
import styles from './Header.css';
import Settings from 'react-icons/lib/md/settings';
import EventHeader from './EventHeader';
import EventListHeader from './EventListHeader';
import BaseHeader from './BaseHeader';
import { Link } from 'react-router';


export default props => {
    let {signOut, loading, show, currentEvent, location, isAuthenticated, canGoBack, goBack} = props;
    const path = location.pathname;
    return (
        <header id="mainHeader" className={show ? `${styles.mainHeader} ${styles.show}` : styles.mainHeader}>
            {getHeader(location, currentEvent, isAuthenticated, canGoBack, goBack, loading)}
            {isAuthenticated && <Settings className={styles.headerButton} color="#fff" size="32" onClick={signOut} />}
        </header>
    )
}

function getHeader(location, currentEvent, isAuthenticated, canGoBack, goBack, loading) {
    let paths = location.pathname.split('/');
    switch(paths[2]) {
        case 'eventlist':
            return <EventListHeader loading={loading} title={'Choose Event'} isAuthenticated={isAuthenticated} />;
        case 'event':
            return <EventHeader loading={loading} title={currentEvent} isAuthenticated={isAuthenticated}/>;
        default:
            return <BaseHeader path={paths[2]} goBack={goBack} canGoBack={canGoBack} />;
    }

}