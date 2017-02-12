import React, {Component} from 'react';
import Media from 'react-icons/lib/md/perm-media';
import Face from 'react-icons/lib/md/face';
import Cart from 'react-icons/lib/md/shopping-cart';
import Info from 'react-icons/lib/md/info';
import Close from 'react-icons/lib/md/close';
import UserScreen from './UserScreen';
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
        this.closeUserCard = this.closeUserCard.bind(this);
        this.closeInfoCard = this.closeInfoCard.bind(this);
        this.closeMediaCard = this.closeMediaCard.bind(this);
        this.closeShopCard = this.closeShopCard.bind(this);
    }

    expandInfoCard() {this.expCard(this.infoCard, !this.props.infoScreenOpen, {type: 'INFO_SCREEN_OPEN'});}
    expandMediaCard() {this.expCard(this.mediaCard, !this.props.mediaScreenOpen, {type: 'MEDIA_SCREEN_OPEN'});}
    expandShopCard() {this.expCard(this.shopCard, !this.props.shopScreenOpen, {type: 'SHOP_SCREEN_OPEN'});}
    expandUserCard() {this.expCard(this.userCard, !this.props.userScreenOpen, {type: 'USER_SCREEN_OPEN'});}

    expCard(target, shouldExpand, action) {
        if(shouldExpand) {
            let dispatch = this.props.dispatch;
            expandCard(target, "card--expanded", () => {
                dispatch(action);
            });
        }
    }

    closeInfoCard() {this.closeCard(this.infoCard, {type: 'INFO_SCREEN_CLOSE'});}
    closeMediaCard() {this.closeCard(this.mediaCard, {type: 'MEDIA_SCREEN_CLOSE'});}
    closeShopCard() {this.closeCard(this.shopCard, {type: 'SHOP_SCREEN_CLOSE'});}
    closeUserCard() {this.closeCard(this.userCard, {type: 'USER_SCREEN_CLOSE'});}

    closeCard(target, action) {
        this.props.dispatch(action);
        target.removeAttribute("style");
        target.classList.remove('card--expanded');
    }


    render() {
        return (
            <div className="main-menu">
                <div ref={(r) => this.infoCard = r} className="main-menu__card first" onClick={this.expandInfoCard}>
                    <div className="card__icon-wrapper">
                        <Info color="#fff" size="72" />
                    </div>
                    {this.props.infoScreenOpen && <Close className="back-button" onClick={this.closeInfoCard} color="#fff" size="72" />}
                    <h2>{this.props.currentEvent}</h2>
                </div>
                <div ref={(r) => this.mediaCard = r} className="main-menu__card second" onClick={this.expandMediaCard}>
                    <div className="card__icon-wrapper">
                        <Media color="#fff" size="72" />
                    </div>
                    {this.props.mediaScreenOpen && <Close onClick={this.closeMediaCard} color="#fff" size="72" />}
                </div>
                <div ref={(r) => this.shopCard = r} className="main-menu__card third" onClick={this.expandShopCard}>
                    <div className="card__icon-wrapper">
                        <Cart color="#fff" size="72" />
                    </div>
                    {this.props.shopScreenOpen && <Close onClick={this.closeShopCard} color="#fff" size="72" />}
                </div>
                <div ref={(r) => this.userCard = r} className="main-menu__card fourth" onClick={this.expandUserCard}>
                    <div className="card__icon-wrapper">
                        <Face color="#fff" size="72" />
                    </div>
                    {this.props.userScreenOpen && <Close onClick={this.closeUserCard} color="#fff" size="72" />}
                    {this.props.userScreenOpen && <UserScreen />}
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
        userScreenOpen: state.main.userScreenOpen,
        currentEvent: state.event.name
    }
}


//{trimName(this.props.userName)}
module.exports = connect(mapStateToProps, null)(MainMenu);