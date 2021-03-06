import React, { Component } from 'react';
import api from 'api/Api';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import { fadeIn } from 'utils/animations';
import Back from 'react-icons/lib/fa/arrow-left';
import { toggleShowCheckout, removeItemFromCart, addItemToCart, clearCart } from 'actions/store';
//Styles
import styles from './styles/Checkout.css';
import buttons from 'styles/buttons.css';

//Components
import CartItem from '../components/EventCartItem';

class Checkout extends Component {
    
    constructor() {
        super();
        this.addItemToCart = this.addItemToCart.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    componentDidMount() {
        fadeIn(this.checkoutPage, 1, 0.1, 1, () => {});
    }

    getCartItems(cartItems) {
        return cartItems.map(item => {
            return <CartItem 
                    remove={this.props.removeItemFromCart} 
                    add={this.addItemToCart} 
                    key={item.get('id')} 
                    item={item} />
        });
    }

    addItemToCart(item) {
        if(this.props.cartCount >= 9) {
            this.props.addNotification('Your cart is full', 'error', 'bc');
        } else {
            this.props.addItemToCart(item);
        }
    }

    checkout() {

        const {currentUser, currentEvent, userName, userIdent, signedIn, hasAccess } = this.props;

        //userTable is no longer a requirement.
        if(!userName) {
            this.props.addNotification('You need to enter a name in the profile settings', 'error', 'bc');
            return;
        }

        if(!userIdent) {
            this.props.addNotification('Talk to the staff in order to get access to the store', 'error', 'bc');
            return;
        }

        if (!signedIn || !hasAccess) {
            this.props.addNotification('You must be signed in and registered to the event to use the store.', 'error', 'bc');
            return; 
        }

        //Prevent checking out an empty cart.
        if (this.props.items.size <= 0) {
            this.props.addNotification('You can\'t submit an empty order.', 'error', 'bc');
            return;
        } 

        let items = this.props.items.map(item => {
            return item.toJS();
        }).toArray();

        let order = {
            userId: currentUser,
            eventId: currentEvent,
            name: userName,
            identifier: userIdent,
            items
        };
        
        api.events.placeOrder(order, () => {
            this.props.addNotification('Order sent', 'success', 'bc');
            this.props.clearCart();
        })
    }


    render() {
        return (
            <div ref={(r) => this.checkoutPage = r} className={styles.checkout}>
                <nav className={styles.nav}>
                    <Back onClick={this.props.toggleShowCheckout}  color="#34495e" size="32" />
                    <div className={styles.divider} />
                    <button onClick={this.checkout} disabled={!this.props.signedIn || !this.props.hasAccess} className={buttons.textButtonDark}>ORDER</button>
                </nav>
                <div className={styles.itemList}>
                    <FlipMove duration={400} easing="ease-out">
                        {this.getCartItems(this.props.items)}
                    </FlipMove>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {return {
    signedIn: state.auth.get('authenticated'),
    hasAccess: state.event.userdata.get('userHasAccess'),
    currentUser: state.auth.get('uid'),
    currentEvent: state.event.event.get('id'),
    userName: state.auth.get('name'),
    userIdent: state.event.userdata.get('identifier'),
    items: state.event.store.get('cart'),
    cartCount: state.event.store.get('cart').reduce((count, item) => {
        return count + item.get('count');
    },0),
}}

const mapDispatchToProps = {
    toggleShowCheckout,
    removeItemFromCart,
    addItemToCart,
    clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);