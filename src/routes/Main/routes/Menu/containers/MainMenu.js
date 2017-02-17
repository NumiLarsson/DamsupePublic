import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import UserScreen from './UserScreen';
import MainMenuCard from '../components/MainMenuCard';

//Icons
import Media from 'react-icons/lib/md/perm-media';
import Face from 'react-icons/lib/md/face';
import Cart from 'react-icons/lib/md/shopping-cart';
import Info from 'react-icons/lib/md/info';

//Actions
import {infoScreenOpen, mediaScreenOpen, shopScreenOpen, userScreenOpen,
    infoScreenClose, mediaScreenClose, shopScreenClose, userScreenClose} from '../actions/main';

//Animations
import { expandCard } from '../../../../../utils/animations';

//TODO: Use css modules
import './styles/MainMenu.css';

class MainMenu extends Component  {

    constructor() {
        super();
        this.expCard = this.expCard.bind(this);
        this.closeCard = this.closeCard.bind(this);
    }


    expCard(target, shouldExpand, action) {
        if(shouldExpand) {
            let dispatch = this.props.dispatch;
            expandCard(target, "cardExpanded", () => {
                dispatch(action());
                target.querySelector('.cardHeader').classList.add('cardHeaderExpanded');
            });
            //TODO:FIX
            this.wrapper.style.overflow = "hidden";
        }
    }

    closeCard(target, action) {
        this.props.dispatch(action());
        target.removeAttribute("style");
        target.classList.remove('cardExpanded');
        target.querySelector('.cardHeader').classList.remove('cardHeaderExpanded');
        //TODO:FIX
        this.wrapper.style.overflow = "auto";
    }


    render() {
        return (
            <div className="mainMenu">
                <div ref={(r)=> this.wrapper = r} className="mainMenuCardWrapper">
                    <MainMenuCard 
                        styleClass="first" 
                        open={this.props.infoScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={infoScreenOpen}
                        closeAction={infoScreenClose}>
                            <Info color="#fff" size="72" />
                    </MainMenuCard>
                    <MainMenuCard 
                        styleClass="second" 
                        open={this.props.mediaScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={mediaScreenOpen}
                        closeAction={mediaScreenClose}>
                            <Media color="#fff" size="72" />
                    </MainMenuCard>
                    <MainMenuCard 
                        styleClass="third" 
                        open={this.props.shopScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={shopScreenOpen}
                        closeAction={shopScreenClose}>
                            <Cart color="#fff" size="72" />
                    </MainMenuCard>
                    <MainMenuCard 
                        styleClass="fourth" 
                        open={this.props.userScreenOpen} 
                        expandCard={this.expCard} 
                        closeCard={this.closeCard}
                        openAction={userScreenOpen}
                        closeAction={userScreenClose}>
                            <Face color="#fff" size="72" />
                            <UserScreen uid={this.props.uid} currentEvent={this.props.currentEvent} />
                    </MainMenuCard>
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
        infoScreenOpen: state.main.infoScreenOpen,
        mediaScreenOpen: state.main.mediaScreenOpen,
        shopScreenOpen: state.main.shopScreenOpen,
        userScreenOpen: state.main.userScreenOpen
    }
}

module.exports = connect(mapStateToProps, null)(MainMenu);