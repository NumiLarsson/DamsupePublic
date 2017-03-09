import React from 'react';
import { Link } from 'react-router';
import styles from './Header.css';
import User from 'react-icons/lib/md/account-circle';
import EventHeader from './EventHeader';
import EventListHeader from './EventListHeader';
import BaseHeader from './BaseHeader';
import buttons from 'styles/buttons.css';

export default props => {
    let {signOut, loading, redirectLoading, show, currentEvent, location, isAuthenticated, canGoBack, goBack} = props;
    let paths = location.pathname.split('/');
    return (
        <header id="mainHeader" className={show ? `${styles.mainHeader} ${styles.show}` : styles.mainHeader}>
            {getHeader(paths[2], currentEvent, isAuthenticated, canGoBack, goBack, loading, redirectLoading)}
            {isAuthenticated && paths[2] !== 'user' && <Link to="/app/user"><User className={styles.headerButton} color="#fff" size="32" /></Link>}
            {isAuthenticated && paths[2] === 'user' && <button onClick={signOut} className={buttons.textButton}>LOGOUT</button>}
        </header>
    )
}



function getHeader(path, currentEvent, isAuthenticated, canGoBack, goBack, loading, redirectLoading) {
    switch(path) {
        case 'eventlist':
            return <EventListHeader loading={loading} title="Smålands Events" isAuthenticated={isAuthenticated} />;
        case 'event':
            return <EventHeader loading={loading} title={currentEvent} isAuthenticated={isAuthenticated}/>;
        default:
            return <BaseHeader redirectLoading={redirectLoading} 
                        path={path} goBack={goBack} canGoBack={canGoBack} />;
    }

}