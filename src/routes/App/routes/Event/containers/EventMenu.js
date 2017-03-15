import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import EventMenuCard from '../components/EventMenuCard';
import Loader from 'components/Loader/Loader';
import Store from './Store';
import Close from 'react-icons/lib/md/close';

//Actions
import {showContent, hideContent} from 'actions/eventmenu';
import { initializeEvent, cleanupEvent } from 'actions/event';

//Animations
import { expand } from 'utils/animations';

//Styles
import styles from './styles/EventMenu.css';

class EventMenu extends Component  {

    constructor() {
        super();
        this.showContent = this.showContent.bind(this);
        this.hideContent = this.hideContent.bind(this);
    }

    componentWillMount() {
        const {eventId} = this.props.params;
        this.props.initializeEvent(eventId);
    }

    componentWillUnmount () {
        this.props.cleanupEvent();
        document.getElementById('mainHeader').removeAttribute("style");
    }

    showContent() {
        expand(this.eventContent, styles.cardExpanded, this.props.showContent.bind(null, 'store'));
    }

    hideContent() {
        this.props.hideContent();
        this.eventContent.removeAttribute("style");
        document.getElementById('mainHeader').removeAttribute("style");
        this.eventContent.classList.remove(styles.cardExpanded);
    }   

    render() {
        return (
            <div className={styles.eventMenu}>
                <header>

                </header>
                <Loader show={this.props.eventDataLoading || this.props.userEventDataLoading} />
                <div ref={r => this.eventContent = r} className={styles.eventContent}>
                    {this.props.contentShowing &&
                        <header className={styles.contentHeader}>
                            <span className={styles.headerTitle}><h3>Store</h3></span>             
                            <Close className={styles.backButton} onClick={this.hideContent} color="#34495e" size="48" />
                        </header>}
                    {this.props.contentShowing && this.props.screen === 'store' &&<Store />}
                </div>
            </div>
        )
    }
    
}

// <button onClick={this.showContent}>Show</button>
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.get('authenticated'),
        uid: state.auth.get('uid'),
        userHasAccess: state.event.userdata.get('userHasAccess'),
        currentEvent: state.event.event.get('id'),
        eventDataLoading: state.event.event.get('loading'),
        userEventDataLoading: state.event.userdata.get('loading'),
        contentShowing: state.event.menu.get('showContent'),
        screen: state.event.menu.get('screen')
    }
}

const mapDispatchToProps = {
        initializeEvent,
        cleanupEvent,
        showContent,
        hideContent
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventMenu);