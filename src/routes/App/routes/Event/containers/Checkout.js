import React, { Component } from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import { fadeIn } from 'utils/animations';
import Back from 'react-icons/lib/fa/arrow-left';
import { toggleShowCheckout, removeItemFromCart, addItemToCart } from 'actions/store';
//Styles
import styles from './styles/Checkout.css';
import list from 'styles/list.css';
import buttons from 'styles/buttons.css';

//Components
import CartItem from '../components/EventCartItem';

class Checkout extends Component {
    
    constructor() {
        super();
        this.addItemToCart = this.addItemToCart.bind(this);
    }

    componentDidMount() {
        fadeIn(this.checkout, 1, 0.1, 1, () => {});
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


    render() {
        return (
            <div ref={(r) => this.checkout = r} className={styles.checkout}>
                <nav className={styles.nav}>
                    <Back onClick={this.props.toggleShowCheckout}  color="#34495e" size="32" />
                    <div className={styles.divider} />
                    <button disabled={!this.props.signedIn || !this.props.hasAccess} className={buttons.textButtonDark}>ORDER</button>
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
    items: state.event.store.get('cart'),
    cartCount: state.event.store.get('cart').reduce((count, item) => {
        return count + item.get('count');
    },0),
}}

const mapDispatchToProps = {
    toggleShowCheckout,
    removeItemFromCart,
    addItemToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);