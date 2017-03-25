import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Checkout from './Checkout';
import Order from './Order';
import { addNotification } from 'actions/app';

//Styles
import styles from './styles/Store.css';

class Store extends Component {

    constructor() {
        super();
        this.addNotification = this.addNotification.bind(this);
    }

    addNotification(message, level, position) {
        this.props.addNotification({message, level, position});
    }

    render() {
        return (
            <div ref={(r) => this.store = r} className={styles.store}>
                {!this.props.showCheckout ? <Order addNotification={this.addNotification} /> : <Checkout addNotification={this.addNotification} />}
            </div>
        )
    }
}

const mapStateToProps = state => {return {
    showCheckout: state.event.store.get('showCheckout'),
}}

const mapDispatchToProps = {
    addNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);