import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import UserScreen from './UserScreen';
import EventMenuCard from '../components/EventMenuCard';
import Loader from 'components/Loader/Loader';

//Icons
import Media from 'react-icons/lib/md/perm-media';
import Face from 'react-icons/lib/md/face';
import Cart from 'react-icons/lib/md/shopping-cart';
import Info from 'react-icons/lib/md/info';

//Actions
import {infoScreenOpen, mediaScreenOpen, shopScreenOpen, userScreenOpen,
    infoScreenClose, mediaScreenClose, shopScreenClose, userScreenClose} from 'actions/eventmenu';
import { resetMenu } from 'actions/eventmenu';
import { setupEventUserDataHooks, eventLoading, resetEventData } from 'actions/event';

//Animations
import { expand } from 'utils/animations';

//Styles
import styles from './styles/EventMenu.css';

class EventMenu extends Component  {

    constructor() {
        super();
        this.expCard = this.expCard.bind(this);
        this.closeCard = this.closeCard.bind(this);
    }

    componentWillMount() {
        const {eventId} = this.props.params;
        this.props.resetMenu();
        this.props.eventLoading();
        this.props.setupEventUserDataHooks(this.props.uid, eventId);
    }

    componentWillUnmount () {
        this.props.resetEventData();
    }

    expCard(target, shouldExpand, action) {
        if(shouldExpand) {
            let dispatch = this.props.dispatch;
            expand(target, styles.cardExpanded, () => {
                dispatch(action());
                target.querySelector(`.${styles.cardHeader}`).classList.add(styles.cardHeaderExpanded);
            });
            //TODO:FIX
            this.wrapper.style.overflow = "hidden";
        }
    }

    closeCard(target, action) {
        this.props.dispatch(action());
        target.removeAttribute("style");
        document.getElementById('mainHeader').removeAttribute("style");
        target.classList.remove(styles.cardExpanded);
        target.querySelector(`.${styles.cardHeader}`).classList.remove(styles.cardHeaderExpanded);
        //TODO:FIX
        this.wrapper.style.overflow = "auto";
    }   


    render() {
        return (
            <div className={styles.eventMenu}>
                <Loader show={this.props.eventDataLoading || this.props.userEventDataLoading} />
                <div ref={(r)=> this.wrapper = r} className={styles.eventMenuCardWrapper}>
                    <EventMenuCard
                        disabled={false} 
                        styleClass={styles.first}
                        headerStyle={styles.cardHeader} 
                        open={this.props.infoScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={infoScreenOpen}
                        closeAction={infoScreenClose}>
                            <div className={styles.cardHeaderTitle}>
                                <Info color="#fff" size="72" />
                                <h2 className={styles.cardHeaderTitleText}>Information</h2>
                            </div>
                    </EventMenuCard>
                    <EventMenuCard 
                        disabled={false} 
                        styleClass={styles.second}
                        headerStyle={styles.cardHeader}  
                        open={this.props.mediaScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={mediaScreenOpen}
                        closeAction={mediaScreenClose}>
                            <div className={styles.cardHeaderTitle}>
                                <Media color="#fff" size="72" />
                                <h2 className={styles.cardHeaderTitleText}>Media</h2>
                            </div>
                    </EventMenuCard>
                    <EventMenuCard 
                        disabled={false} 
                        styleClass={styles.third}
                        headerStyle={styles.cardHeader}  
                        open={this.props.shopScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={shopScreenOpen}
                        closeAction={shopScreenClose}>
                            <div className={styles.cardHeaderTitle}>
                                <Cart color="#fff" size="72" />
                                <h2 className={styles.cardHeaderTitleText}>Store</h2>
                            </div>
                    </EventMenuCard>
                    <EventMenuCard
                        disabled={false}  
                        styleClass={styles.fourth}
                        headerStyle={styles.cardHeader}  
                        open={this.props.userScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={userScreenOpen}
                        closeAction={userScreenClose}>
                            <div className={styles.cardHeaderTitle}>
                                <Face color="#fff" size="72" />
                                <h2 className={styles.cardHeaderTitleText}>User</h2>
                            </div>
                            <UserScreen uid={this.props.uid} currentEvent={this.props.currentEvent} />
                    </EventMenuCard>
                </div>
            </div>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        userName: state.auth.name,
        uid: state.auth.uid,
        currentEvent: state.auth.lastVisitedEvent,
        currentEventName: state.event.event.name,
        infoScreenOpen: state.event.menu.infoScreenOpen,
        mediaScreenOpen: state.event.menu.mediaScreenOpen,
        shopScreenOpen: state.event.menu.shopScreenOpen,
        userScreenOpen: state.event.menu.userScreenOpen,
        eventDataLoading: state.event.event.eventDataLoading,
        userEventDataLoading: state.event.event.userEventDataLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetMenu: () => dispatch(resetMenu()),
        dispatch, 
        setupEventUserDataHooks: (uid, lastVisitedEvent) => {
            dispatch(setupEventUserDataHooks(uid, lastVisitedEvent))
        },
        eventLoading: () => dispatch(eventLoading()),
        resetEventData: () => dispatch(resetEventData())
    }
    
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventMenu);