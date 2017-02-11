import React from 'react';
import Back from 'react-icons/lib/md/arrow-back';
import { Link } from 'react-router';
import './styles/NotSignedInHeader.css';

const backEnabled = {
    "/register": true
}

export default props => {
    return (
            <div className="not-signed-in-header">
                {backEnabled[props.location.pathname] && 
                    <span className="backButton" role="button"><Back color="#1abc9c" size="32" onClick={props.goBack} /></span>}
                <div className="not-signed-in-header__divider">
                </div>
                {props.location.pathname === '/login' && !props.redirectLoading && !props.loginLoading &&
                    <Link className="emphesized-link" to="/register">Sign up</Link> }
            </div>
    );
}