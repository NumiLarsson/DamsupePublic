import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fadeIn } from 'utils/animations';
import StoreItem from '../components/EventStoreItem';
import Diamond from 'react-icons/lib/fa/diamond';
import Drink from 'react-icons/lib/fa/glass';
import Beer from 'react-icons/lib/fa/beer';
import Cart from 'react-icons/lib/fa/shopping-cart';
import NotificationSystem from 'react-notification-system';
//Actions
import { changeSelectedCategory, addItemToCart } from 'actions/store';

//Styles
import styles from './styles/Store.css';

const notificationStyle = {
    NotificationItem: {
        DefaultStyle: {
            color: '#fff',
            border: 'none',
            textTransform: 'uppercase'
        },
        error: {
            backgroundColor: 'red',
        },
        success: {
            backgroundColor: 'green'
        }
    },
    Dismiss: {
        DefaultStyle: {
            color: '#fff',
            backgroundColor: 'transparent'
        }
    }
}

class Store extends Component {
    
    componentDidMount() {
        fadeIn(this.store, 1, 0.1, 1, () => {});
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
            this.addNotification(
                'You must be signed in and registered to the event in order to use the store.', 
                'error', 
                'bc', 
            2);
        } else if(this.props.cartCount >= 9) {
            this.addNotification('You cannot order more than 9 items at a time.', 'error', 'bc', 2);
        } else {
            this.props.addItemToCart(item);
            const name = item.get('name');
            this.addNotification(`Added ${name} to the cart`, 'success', 'bc', 2);
        }
    }

    addNotification(message, level, position, dismiss) {
        this.notificationSystem.addNotification({
            message,
            level,
            position,
            dismiss
        });
    }

    render() {
        return (
            <div ref={(r) => this.store = r} className={styles.store}>
                <NotificationSystem style={notificationStyle} ref={r => this.notificationSystem = r} />
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
                        <Cart className={styles.cart} color="#34495e" size="32" />
                        {this.props.cartCount > 0 && <span className={styles.cartCount}>{this.props.cartCount}</span>}
                    </div>
                </nav>
                <div className={styles.itemList}>
                    {this.filterStoreItems(this.props.items, this.props.category)}
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
    addItemToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);