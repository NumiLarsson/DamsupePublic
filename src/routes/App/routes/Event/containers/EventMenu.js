import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import EventMenuCard from '../components/EventMenuCard';
import Loader from 'components/Loader/Loader';
import Store from './Store';

//Icons
import Media from 'react-icons/lib/md/perm-media';
import Cart from 'react-icons/lib/md/shopping-cart';
import Info from 'react-icons/lib/md/info';

//Actions
import {infoScreenOpen, mediaScreenOpen, shopScreenOpen,
    infoScreenClose, mediaScreenClose, shopScreenClose} from 'actions/eventmenu';
import { resetMenu } from 'actions/eventmenu';
import { setupEventUserDataHooks, eventLoading, resetEventData, unsubscribeToEvent } from 'actions/event';
import { updateCanGoBack } from 'actions/app';

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
        this.props.setupEventUserDataHooks(eventId);
        this.props.updateCanGoBack(true);
    }

    componentWillUnmount () {
        this.props.resetEventData();
        this.props.unsubscribeToEvent();
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
        this.wrapper.style.overflow = "auto";
    }   


    render() {
        return (
            <div className={styles.eventMenu}>
                <Loader show={this.props.eventDataLoading || this.props.userEventDataLoading} />
                <div ref={(r)=> this.wrapper = r} className={styles.eventMenuCardWrapper}>
                    <EventMenuCard
                        disabled={false} 
                        styleClass={styles.second}
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
                        styleClass={styles.fourth}
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
                </div>
            </div>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.get('authenticated'),
        uid: state.auth.get('uid'),
        userHasAccess: state.event.userdata.get('userHasAccess'),
        currentEvent: state.event.event.get('id'),
        infoScreenOpen: state.event.menu.get('infoScreenOpen'),
        mediaScreenOpen: state.event.menu.get('mediaScreenOpen'),
        shopScreenOpen: state.event.menu.get('shopScreenOpen'),
        eventDataLoading: state.event.event.get('loading'),
        userEventDataLoading: state.event.userdata.get('loading')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetMenu: () => dispatch(resetMenu()),
        dispatch, 
        setupEventUserDataHooks: (eventId) => {
            dispatch(setupEventUserDataHooks(eventId))
        },
        eventLoading: () => dispatch(eventLoading()),
        resetEventData: () => dispatch(resetEventData()),
        unsubscribeToEvent: () => dispatch(unsubscribeToEvent()),
        updateCanGoBack: (val) => dispatch(updateCanGoBack(val))
    }
    
}

/**
 <EventMenuCard
                        disabled={!this.props.userHasAccess}  
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
 */

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventMenu);