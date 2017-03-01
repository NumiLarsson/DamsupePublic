import React from 'react';
import styles from './Header.css';
import Settings from 'react-icons/lib/md/settings';
import EventHeader from './EventHeader';
import EventListHeader from './EventListHeader';
import BaseHeader from './BaseHeader';

export default props => {
    let {signOut, loading, redirectLoading, show, currentEvent, location, isAuthenticated, canGoBack, goBack} = props;
    return (
        <header id="mainHeader" className={show ? `${styles.mainHeader} ${styles.show}` : styles.mainHeader}>
            {getHeader(location, currentEvent, isAuthenticated, canGoBack, goBack, loading, redirectLoading)}
            {isAuthenticated && <Settings className={styles.headerButton} color="#fff" size="32" onClick={signOut} />}
        </header>
    )
}

function getHeader(location, currentEvent, isAuthenticated, canGoBack, goBack, loading, redirectLoading) {
    let paths = location.pathname.split('/');
    switch(paths[2]) {
        case 'eventlist':
            return <EventListHeader loading={loading} title="Smålands Events" isAuthenticated={isAuthenticated} />;
        case 'event':
            return <EventHeader loading={loading} title={currentEvent} isAuthenticated={isAuthenticated}/>;
        default:
            return <BaseHeader redirectLoading={redirectLoading} 
                        path={paths[2]} goBack={goBack} canGoBack={canGoBack} />;
    }

}