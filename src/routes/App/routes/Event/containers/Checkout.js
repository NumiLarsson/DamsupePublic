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
            this.props.addNotification('Your cart is full', 'error', 'bc', 2);
        } else {
            this.props.addItemToCart(item);
        }
    }

    checkout() {

        const {currentUser, currentEvent, userName, userTable, signedIn, hasAccess } = this.props;

        if(!userName /*|| !userTable*/) {
            this.props.addNotification('You need to enter a name' /*and table'*/, 'error', 'bc', 2);
            return;
        }

        if (!signedIn || !hasAccess) {
            this.props.addNotification('You must be signed in and registered to the event to use the store.', 'error', 'bc', 2);
            return; 
        }

        let items = this.props.items.map(item => {
            return item.toJS();
        }).toArray();
        
        let order = {
            userId: currentUser,
            eventId: currentEvent,
            name: userName,
            table: userTable,
            items
        };
        
        api.events.placeOrder(order, () => {
            this.props.addNotification('Order sent', 'success', 'bc', 2);
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
    userTable: state.event.userdata.get('table'),
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