import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import Loader from 'components/Loader/Loader';
import Store from './Store';
import SectionDivider from '../components/SectionDivider';
import EventHeader from '../components/EventHeader';
import EventDescription from '../components/EventDescription';
//Icons
import Close from 'react-icons/lib/md/close';

//Actions
import {showContent, hideContent} from 'actions/eventmenu';
import { initializeEvent, cleanupEvent, requestEventAccess } from 'actions/event';
import { addNotification } from 'actions/app';

//Animations
import { expand } from 'utils/animations';

//Styles
import styles from './styles/EventMenu.css';

class EventMenu extends Component  {

    constructor() {
        super();
        this.showContent = this.showContent.bind(this);
        this.hideContent = this.hideContent.bind(this);
        this.requestEventAccess = this.requestEventAccess.bind(this);
    }

    componentWillMount() {
        const {eventId} = this.props.params;
        this.props.initializeEvent(eventId);
    }

    componentWillUnmount () {
        this.props.cleanupEvent();
        document.getElementById('mainHeader').removeAttribute("style");
    }

    showContent(screen) {
        expand(this.eventContent, styles.cardExpanded, this.props.showContent.bind(null, screen));
    }

    hideContent() {
        this.props.hideContent();
        this.eventContent.removeAttribute("style");
        document.getElementById('mainHeader').removeAttribute("style");
        this.eventContent.classList.remove(styles.cardExpanded);
    }   

    getTitle() {
        switch (this.props.screen) {
            case 'media':
                return 'Media';
            case 'chat':
                return 'Chat';
            default:
                return 'Store';
        }
    }

    requestEventAccess() {

        if (!this.props.username) {
            this.props.addNotification({
                message: 'Please enter your name in the profile settings.', 
                level: 'error', 
                position: 'bc'
            });
            return;
        } else {
            let uid = this.props.uid;
            let eventId = this.props.currentEvent.get('id');
            this.props.requestEventAccess({uid, eventId});
        }
    }

    render() {
        let { currentEvent } = this.props;
        return (
            <div className={styles.eventMenu}>
                <Loader show={this.props.eventDataLoading} />
                <main className={styles.eventMenuMain}>
                    <EventHeader event={currentEvent} />
                    <EventDescription description={currentEvent.get('description')} />
                    <SectionDivider />
                    {this.props.isSignedIn && !this.props.userHasAccess && !this.props.requestPending &&
                        <section className={styles.menuSection}>
                            <span />
                            <button className={styles.contentOpenButton} onClick={this.requestEventAccess}>join event</button>
                        </section>
                    }
                    {this.props.isSignedIn && ((!this.props.userHasAccess && this.props.requestPending) || !this.props.userIdent) &&
                        <section className={styles.applySection}>
                            <h2>Request pending</h2>
                        </section>
                    }
                    {this.props.isSignedIn && this.props.userHasAccess && this.props.userIdent &&
                        <section className={styles.menuSection}>
                            {!this.props.currentEvent.get('active') && 
                                <div className={styles.sectionOverlay}>
                                    <h2>Coming soon</h2>
                                </div>
                            }
                            <h2>Store</h2>
                            <button disabled={!this.props.currentEvent.get('active')} className={styles.contentOpenButton} onClick={this.showContent.bind(this, 'store')}>open</button>
                        </section>
                    }
               </main>

                <div ref={r => this.eventContent = r} className={styles.eventContent}>
                    {this.props.contentShowing &&
                        <header className={styles.contentHeader}>
                            <span className={styles.headerTitle}><h3>{this.getTitle()}</h3></span>             
                            <Close className={styles.backButton} onClick={this.hideContent} color="#34495e" size="48" />
                        </header>}
                        <div className={styles.contentBody}>
                            {this.props.contentShowing && this.props.screen === 'store' &&<Store />}
                        </div>
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
        username: state.auth.get('name'),
        userHasAccess: state.event.userdata.get('userHasAccess'),
        requestPending: state.event.userdata.get('requestPending'),
        userIdent: state.event.userdata.get('identifier'),
        currentEvent: state.event.event,
        eventDataLoading: state.event.event.get('loading'),
        userEventDataLoading: state.event.userdata.get('loading'),
        contentShowing: state.event.menu.get('showContent'),
        screen: state.event.menu.get('screen')
    }
}

const mapDispatchToProps = {
        initializeEvent,
        cleanupEvent,
        requestEventAccess,
        showContent,
        hideContent,
        addNotification
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventMenu);