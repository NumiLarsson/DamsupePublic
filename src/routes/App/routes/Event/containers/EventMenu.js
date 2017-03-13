import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import EventMenuCard from '../components/EventMenuCard';
import Loader from 'components/Loader/Loader';
import Store from './Store';

//Actions
import {infoScreenOpen, mediaScreenOpen, shopScreenOpen,
    infoScreenClose, mediaScreenClose, shopScreenClose} from 'actions/eventmenu';
import { initializeEvent, cleanupEvent } from 'actions/event';

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
        this.props.initializeEvent(eventId);
    }

    componentWillUnmount () {
        this.props.cleanupEvent();
        document.getElementById('mainHeader').removeAttribute("style");
    }

    expCard(target, shouldExpand, action) {
        if(shouldExpand) {
            let dispatch = this.props.dispatch;
            expand(target, styles.cardExpanded, () => {
                dispatch(action());
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
        this.wrapper.style.overflow = "auto";
    }   

    render() {
        return (
            <div className={styles.eventMenu}>
                <Loader show={this.props.eventDataLoading || this.props.userEventDataLoading} />
                <div ref={(r)=> this.wrapper = r} className={styles.eventMenuCardWrapper}>
                    <EventMenuCard
                        disabled={false} 
                        open={this.props.infoScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={infoScreenOpen}
                        closeAction={infoScreenClose}
                        image={this.props.infoImageUrl}
                        title="Event Information">
                    </EventMenuCard>
                    <EventMenuCard 
                        disabled={false} 
                        open={this.props.mediaScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={mediaScreenOpen}
                        closeAction={mediaScreenClose}
                        image={this.props.mediaImageUrl}
                        title="Media">
                    </EventMenuCard>
                    <EventMenuCard 
                        disabled={false} 
                        open={this.props.shopScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={shopScreenOpen}
                        closeAction={shopScreenClose}
                        image={this.props.shopImageUrl}
                        title="store">
                            <Store />
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
        userEventDataLoading: state.event.userdata.get('loading'),
        shopImageUrl: state.event.event.get('shopImage'),
        mediaImageUrl: state.event.event.get('mediaImage'),
        infoImageUrl: state.event.event.get('infoImage')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch, 
        initializeEvent: (eventId) => dispatch(initializeEvent(eventId)),
        cleanupEvent: () => dispatch(cleanupEvent())
    }
    
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventMenu);