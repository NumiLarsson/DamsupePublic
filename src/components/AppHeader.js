import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import './styles/AppHeader.css';
import { goBack } from 'react-router-redux';
import NotSignedInHeader from './Header/NotSignedInHeader';
import SignedInHeader from './Header/SignedInHeader';


class AppHeader extends Component {
    
    constructor() {
        super();
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.goBack();
    }

    getHeader(signedIn) {
        return (
            !signedIn ? <NotSignedInHeader key={0} location={this.props.location} goBack={this.props.goBack} 
                            loginLoading={this.props.loginLoading} redirectLoading={this.props.redirectLoading}/>
            : <SignedInHeader key={1} location={this.props.location} goBack={this.props.goBack} />
        )
    }

    render() {
        return (       
                <ReactCSSTransitionGroup
                    component="header"
                    className="app-header"
                    transitionName="header-swap"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.getHeader(this.props.signedIn)}
                </ReactCSSTransitionGroup>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        signedIn: state.auth.authenticated,
        loginLoading: state.login.loading,
        redirectLoading: state.login.redirectLoading
    }
}

const mapDispatchToProps = {
    goBack
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);