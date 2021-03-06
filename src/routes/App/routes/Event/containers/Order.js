import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fadeIn } from 'utils/animations';
import FlipMove from 'react-flip-move';
import StoreItem from '../components/EventStoreItem';
import Diamond from 'react-icons/lib/fa/diamond';
import Drink from 'react-icons/lib/fa/glass';
import Beer from 'react-icons/lib/fa/beer';
import Cart from 'react-icons/lib/fa/shopping-cart';
//Actions
import { changeSelectedCategory, addItemToCart, toggleShowCheckout } from 'actions/store';

import styles from './styles/Order.css';

class Order extends Component {
    
    constructor() {
        super();
        this.addItemToCart = this.addItemToCart.bind(this);
    }

    componentDidMount() {
        fadeIn(this.order, 1, 0.1, 1, () => {});
    }

    filterStoreItems(storeItems) {
        let category  = this.props.category;
        return storeItems.filter(item => {
            return (item.get('category') === category);
        }).map(item => {
            return <StoreItem add={this.addItemToCart.bind(this, item)} key={item.get('id')} item={item} icon={this.getIcon(item.get('category'))}  />
        });
    }

    getIcon(category) {
        switch (category) {
            case 1:
                return <Diamond color="#ddd" size="48" />
            case 2:
                return <Drink color="#ddd" size="48" />
            case 3:  
                return <Beer color="#ddd" size="48" />
            default:
                return <Diamond color="#ddd" size="48" />
        }
    }

    addItemToCart(item) {
        if (!this.props.signedIn || !this.props.hasAccess) {
            this.props.addNotification(
                'You must be signed in and registered to the event to use the store.', 
                'error', 
                'bc', 
            );
        } else if(this.props.cartCount >= 9) {
            this.props.addNotification('Your cart is full', 'error', 'bc');
        } else {
            this.props.addItemToCart(item);
        }
    }

    render() {
        return (
            <div ref={(r) => this.order = r} className={styles.order}>
                <nav className={styles.nav}>
                    <Diamond 
                        onClick={this.props.changeSelectedCategory.bind(null, 1)} 
                        className={styles.navItem} 
                        color={this.props.category === 1 ? "#34495e" : "#dddddd"} 
                        size="32" 
                    />
                    <Drink 
                        onClick={this.props.changeSelectedCategory.bind(null, 2)} 
                        className={styles.navItem} 
                        color={this.props.category === 2 ? "#34495e" : "#dddddd"} 
                        size="32" 
                    />
                    <Beer 
                        onClick={this.props.changeSelectedCategory.bind(null, 3)} 
                        className={styles.navItem} 
                        color={this.props.category === 3 ? "#34495e" : "#dddddd"} 
                        size="32" 
                    />
                    <div className={styles.divider} />
                    <div className={styles.cartWrapper}>
                        <Cart onClick={this.props.toggleShowCheckout} className={styles.cart} color="#34495e" size="32" />
                        {this.props.cartCount > 0 && <span className={styles.cartCount}>{this.props.cartCount}</span>}
                    </div>
                </nav>
                <div className={styles.itemList}>
                    <FlipMove duration={400} easing="ease-out" enterAnimation="fade" leaveAnimation="fade">
                        {this.filterStoreItems(this.props.items, this.props.category)}
                    </FlipMove>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {return {
    signedIn: state.auth.get('authenticated'),
    hasAccess: state.event.userdata.get('userHasAccess'),
    category: state.event.store.get('selectedCategory'),
    cartCount: state.event.store.get('cart').reduce((count, item) => {
        return count + item.get('count');
    },0),
    items: state.event.store.get('items')
}}

const mapDispatchToProps = {
    changeSelectedCategory,
    addItemToCart,
    toggleShowCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);