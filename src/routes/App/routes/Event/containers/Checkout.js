import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
    
    componentDidMount() {
        fadeIn(this.checkout, 1, 0.1, 1, () => {});
    }

    getCartItems(cartItems) {
        return cartItems.map(item => {
            return <CartItem 
                    remove={this.props.removeItemFromCart.bind(null, item.get('id'))} 
                    add={this.props.addItemToCart.bind(this, item)} 
                    key={item.get('id')} 
                    item={item} />
        });
    }

    addItemToCart(item) {
        if(this.props.cartCount >= 9) {
            this.props.addNotification('You cannot order more than 9 items at a time.', 'error', 'bc', 2);
        } else {
            this.props.addItemToCart(item);
            const name = item.get('name');
            this.props.addNotification(`Added ${name} to the cart`, 'success', 'bc', 2);
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
                    <ReactCSSTransitionGroup transitionEnterTimeout={800} transitionLeaveTimeout={800} transitionName={list}>
                        {this.getCartItems(this.props.items)}
                    </ReactCSSTransitionGroup>
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