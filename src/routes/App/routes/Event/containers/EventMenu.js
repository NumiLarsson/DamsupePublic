import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import EventMenuCard from '../components/EventMenuCard';
import Loader from 'components/Loader/Loader';
import Store from './Store';
import Close from 'react-icons/lib/md/close';
import Cart from 'react-icons/lib/fa/shopping-cart';

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

    showContent(screen) {
        expand(this.eventContent, styles.cardExpanded, this.props.showContent.bind(null, screen));
    }

    hideContent() {
        this.props.hideContent();
        this.eventContent.removeAttribute("style");
        document.getElementById('mainHeader').removeAttribute("style");
        this.eventContent.classList.remove(styles.cardExpanded);
    }   

    render() {
        let { currentEvent } = this.props;
        let start = currentEvent.get('start');
        let end = currentEvent.get('end');
        return (
            <div className={styles.eventMenu}>
                <Loader show={this.props.eventDataLoading} />
                <header className={styles.infoSection}>
                    <img className={styles.headerImage} src={currentEvent.get('headerImage')}></img>
                    <div className={styles.titleSection}>
                            <div className={styles.dateSection}>
                                <span className={styles.month}>
                                    {currentEvent.get('date') !== 0 && getMonth(currentEvent.get('date'))}
                                </span>
                                <span className={styles.day}>
                                    {currentEvent.get('date') !== 0 && getDay(currentEvent.get('date'))}
                                </span>
                            </div>
                            <div className={styles.nameSection}>
                                <h3>{currentEvent.get('name')}</h3>
                            </div>
                            <div className={styles.timeSection}>
                                <span>{currentEvent.get('type')}</span>
                                <span>{start && end && `${start}-${end}`}</span>
                            </div>
                        </div>
                </header>
                <section className={styles.descriptionSection}>
                    <p>{currentEvent.get('description')}</p>
                </section>
                <div className={styles.divider} />
                <section className={styles.storeSection}>
                    <h2>Store</h2>
                    <button className={styles.contentOpenButton} onClick={this.showContent.bind(this, 'store')}>open</button>
                </section>
                <div ref={r => this.eventContent = r} className={styles.eventContent}>
                    {this.props.contentShowing &&
                        <header className={styles.contentHeader}>
                            <span className={styles.headerTitle}><h3>Store</h3></span>             
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

function getDay(date) {
    const temp = new Date(date);
    return temp.getDate();
}

function getMonth(date) {
    const temp = new Date(date);
    const locale = "sv-SE"
    const month = temp.toLocaleString(locale, { month: "short" });
    return month.slice(0, -1);
}

// <button onClick={this.showContent}>Show</button>
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.get('authenticated'),
        uid: state.auth.get('uid'),
        userHasAccess: state.event.userdata.get('userHasAccess'),
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
        showContent,
        hideContent
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventMenu);