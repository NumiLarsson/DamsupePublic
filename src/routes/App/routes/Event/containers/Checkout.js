import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fadeIn } from 'utils/animations';
import Diamond from 'react-icons/lib/fa/diamond';
import Drink from 'react-icons/lib/fa/glass';
import Beer from 'react-icons/lib/fa/beer';
import Back from 'react-icons/lib/fa/arrow-left';
import Money from 'react-icons/lib/fa/money';
import { toggleShowCheckout } from 'actions/store';
//Styles
import styles from './styles/Checkout.css';
import buttons from 'styles/buttons.css';

class Checkout extends Component {
    
    componentDidMount() {
        fadeIn(this.checkout, 1, 0.1, 1, () => {});
    }

    render() {
        return (
            <div ref={(r) => this.checkout = r} className={styles.checkout}>
                <nav className={styles.nav}>
                    <Back onClick={this.props.toggleShowCheckout}  color="#34495e" size="32" />
                    <div className={styles.divider} />
                    <button disabled={!this.props.signedIn || !this.props.hasAccess} className={buttons.flatButtonPrimarySmall}>PLACE ORDER</button>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {return {
    signedIn: state.auth.get('authenticated'),
    hasAccess: state.event.userdata.get('userHasAccess')
}}

const mapDispatchToProps = {
    toggleShowCheckout
}

export default connect(null, mapDispatchToProps)(Checkout);