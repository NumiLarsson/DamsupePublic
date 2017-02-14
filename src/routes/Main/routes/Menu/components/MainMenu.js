import React, {Component} from 'react';
import Media from 'react-icons/lib/md/perm-media';
import Face from 'react-icons/lib/md/face';
import Cart from 'react-icons/lib/md/shopping-cart';
import Info from 'react-icons/lib/md/info';
import Close from 'react-icons/lib/md/close';
import UserScreen from './UserScreen';
import {infoScreenOpen, mediaScreenOpen, shopScreenOpen, userScreenOpen,
    infoScreenClose, mediaScreenClose, shopScreenClose, userScreenClose} from '../actions/menu';
import { connect } from 'react-redux';
import { expandCard } from '../../../../../utils/animations';
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

    expCard(target, shouldExpand, action) {
        if(shouldExpand) {
            let dispatch = this.props.dispatch;
            expandCard(target, "card--expanded", () => {
                dispatch(action);
                target.querySelector('.card__header').classList.add('card__header--expanded');
            });
            //TODO:FIX
            this.wrapper.style.overflow = "hidden";
        }
    }

    closeInfoCard() {this.closeCard(this.infoCard, infoScreenClose());}
    closeMediaCard() {this.closeCard(this.mediaCard, mediaScreenClose());}
    closeShopCard() {this.closeCard(this.shopCard, shopScreenClose());}
    closeUserCard() {this.closeCard(this.userCard, userScreenClose());}

    closeCard(target, action) {
        this.props.dispatch(action);
        target.removeAttribute("style");
        target.classList.remove('card--expanded');
        target.querySelector('.card__header').classList.remove('card__header--expanded');
        //TODO:FIX
        this.wrapper.style.overflow = "auto";
    }


    render() {
        return (
            <div className="main-menu">
                <div ref={(r)=> this.wrapper = r} className="main-menu-card__wrapper">
                    <div ref={(r) => this.infoCard = r} className="main-menu__card first" onClick={this.expandInfoCard}>
                        <div className="card__header">
                            <Info color="#fff" size="72" />
                             {this.props.infoScreenOpen && <Close className="back-button" onClick={this.closeInfoCard} color="#fff" size="52" />}
                        </div>
                    </div>
                    <div ref={(r) => this.mediaCard = r} className="main-menu__card second" onClick={this.expandMediaCard}>
                        <div className="card__header">
                            <Media color="#fff" size="72" />
                            {this.props.mediaScreenOpen && <Close className="back-button" onClick={this.closeMediaCard} color="#fff" size="52" />}
                        </div>
                    </div>
                    <div ref={(r) => this.shopCard = r} className="main-menu__card third" onClick={this.expandShopCard}>
                        <div className="card__header">
                            <Cart color="#fff" size="72" />
                            {this.props.shopScreenOpen && <Close className="back-button" onClick={this.closeShopCard} color="#fff" size="52" />}
                        </div>
                    </div>
                    <div ref={(r) => this.userCard = r} className="main-menu__card fourth" onClick={this.expandUserCard}>
                        <div className="card__header">
                            <Face color="#fff" size="72" />
                            {this.props.userScreenOpen && <Close onClick={this.closeUserCard} color="#fff" size="52" />}
                        </div>
                        {this.props.userScreenOpen && <UserScreen />}
                    </div>
                </div>
            </div>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        userName: state.auth.name,
        infoScreenOpen: state.main.infoScreenOpen,
        mediaScreenOpen: state.main.mediaScreenOpen,
        shopScreenOpen: state.main.shopScreenOpen,
        userScreenOpen: state.main.userScreenOpen
    }
}


//{trimName(this.props.userName)}
module.exports = connect(mapStateToProps, null)(MainMenu);