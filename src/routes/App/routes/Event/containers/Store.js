import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import styles from './styles/Store.css';

class Shop extends Component {
    

    render() {
        return (
            <div className={styles.shop} />
        )
    }
}

export default connect(null, null)(Shop);