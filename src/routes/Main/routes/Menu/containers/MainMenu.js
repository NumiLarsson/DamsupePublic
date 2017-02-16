import React, {Component} from 'react';
import Media from 'react-icons/lib/md/perm-media';
import Face from 'react-icons/lib/md/face';
import Cart from 'react-icons/lib/md/shopping-cart';
import Info from 'react-icons/lib/md/info';
import Close from 'react-icons/lib/md/close';
import UserScreen from './UserScreen';
import {infoScreenOpen, mediaScreenOpen, shopScreenOpen, userScreenOpen,
    infoScreenClose, mediaScreenClose, shopScreenClose, userScreenClose} from '../actions/main';
import { connect } from 'react-redux';
import { expandCard } from '../../../../../utils/animations';

//TODO: Use css modules
import './styles/MainMenu.css';

class MainMenu extends Component  {

    constructor() {
        super();
        this.expandUserCard = this.expandUserCard.bind(this);
        this.expandShopCard = this.expandShopCard.bind(this);
        this.expandMediaCard = this.expandMediaCard.bind(this);
        this.expandInfoCard = this.expandInfoCard.bind(this);
        this.expCard = this.expCard.bind(this);
        this.closeCard = this.closeCard.bind(this);
        this.closeUserCard = this.closeUserCard.bind(this);
        this.closeInfoCard = this.closeInfoCard.bind(this);
        this.closeMediaCard = this.closeMediaCard.bind(this);
        this.closeShopCard = this.closeShopCard.bind(this);
    }

    expandInfoCard() {this.expCard(this.infoCard, !this.props.infoScreenOpen, infoScreenOpen());}
    expandMediaCard() {this.expCard(this.mediaCard, !this.props.mediaScreenOpen, mediaScreenOpen());}
    expandShopCard() {this.expCard(this.shopCard, !this.props.shopScreenOpen, shopScreenOpen());}
    expandUserCard() {this.expCard(this.userCard, !this.props.userScreenOpen, userScreenOpen());}
    closeInfoCard() {this.closeCard(this.infoCard, infoScreenClose());}
    closeMediaCard() {this.closeCard(this.mediaCard, mediaScreenClose());}
    closeShopCard() {this.closeCard(this.shopCard, shopScreenClose());}
    closeUserCard() {this.closeCard(this.userCard, userScreenClose());}

    expCard(target, shouldExpand, action) {
        if(shouldExpand) {
            let dispatch = this.props.dispatch;
            expandCard(target, "cardExpanded", () => {
                dispatch(action);
                target.querySelector('.cardHeader').classList.add('cardHeaderExpanded');
            });
            //TODO:FIX
            this.wrapper.style.overflow = "hidden";
        }
    }

    closeCard(target, action) {
        this.props.dispatch(action);
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
                    <div ref={(r) => this.infoCard = r} className="mainMenuCard first" onClick={this.expandInfoCard}>
                        <div className="cardHeader">
                            <Info color="#fff" size="72" />
                             {this.props.infoScreenOpen && <Close className="backButton" onClick={this.closeInfoCard} color="#fff" size="52" />}
                        </div>
                    </div>
                    <div ref={(r) => this.mediaCard = r} className="mainMenuCard second" onClick={this.expandMediaCard}>
                        <div className="cardHeader">
                            <Media color="#fff" size="72" />
                            {this.props.mediaScreenOpen && <Close className="backButton" onClick={this.closeMediaCard} color="#fff" size="52" />}
                        </div>
                    </div>
                    <div ref={(r) => this.shopCard = r} className="mainMenuCard third" onClick={this.expandShopCard}>
                        <div className="cardHeader">
                            <Cart color="#fff" size="72" />
                            {this.props.shopScreenOpen && <Close className="backButton" onClick={this.closeShopCard} color="#fff" size="52" />}
                        </div>
                    </div>
                    <div ref={(r) => this.userCard = r} className="mainMenuCard fourth" onClick={this.expandUserCard}>
                        <div className="cardHeader">
                            <Face color="#fff" size="72" />
                            {this.props.userScreenOpen && <Close className="backButton" onClick={this.closeUserCard} color="#fff" size="52" />}
                        </div>
                        {this.props.userScreenOpen && <UserScreen uid={this.props.uid} currentEvent={this.props.currentEvent} />}
                    </div>
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