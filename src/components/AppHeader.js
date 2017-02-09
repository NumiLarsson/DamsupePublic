import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './styles/AppHeader.css';
import Back from 'react-icons/lib/md/arrow-back';
import { goBack } from 'react-router-redux';

const backEnabled = {
    "/register": true
}

class AppHeader extends Component {
    
    constructor() {
        super();
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.goBack();
        this.props.dispatch({type: 'NavAnimation'});
    }

    render() {
        return (
            
            <header className="app-header">
                {backEnabled[this.props.location.pathname] && 
                    <span className="backButton" role="button"><Back color="#1abc9c" size="32" onClick={this.goBack} /></span>}
                <div className="app-header__divider">
                </div>
                {!this.props.signedIn && this.props.location.pathname === '/login' &&
                    <Link className="emphesized-link" to="/register">Sign up</Link> }
            </header>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        signedIn: state.auth.authenticated
    }
}

const mapDispatchToProps = {
    goBack
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);