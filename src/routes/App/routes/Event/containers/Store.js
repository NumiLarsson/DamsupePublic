import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fadeIn } from 'utils/animations';

//Styles
import styles from './styles/Store.css';

class Store extends Component {
    

    componentDidMount() {
        fadeIn(this.store, 1, 0.1, 1, () => {});
    }


    render() {
        return (
            <div ref={(r) => this.store = r} className={styles.store}>
                <nav className={styles.nav} />
            </div>
        )
    }
}

export default connect(null, null)(Store);