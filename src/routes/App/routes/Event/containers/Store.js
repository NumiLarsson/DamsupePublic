import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Checkout from './Checkout';
import Order from './Order';

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

    constructor() {
        super();
        this.addNotification = this.addNotification.bind(this);
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
                {!this.props.showCheckout ? <Order addNotification={this.addNotification} /> : <Checkout />}
            </div>
        )
    }
}

const mapStateToProps = state => {return {
    showCheckout: state.event.store.get('showCheckout'),
}}

export default connect(mapStateToProps, null)(Store);