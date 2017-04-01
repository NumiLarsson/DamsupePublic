import React, { Component } from 'react';
import styles from './styles/EventStoreItem.css';
import Add from 'react-icons/lib/fa/cart-plus'; 

export default class extends Component {
    
    render() {
        const {item, icon, add} = this.props;
        const picture = item.get('picture');
        return (
            <div className={styles.storeItem}>
                <div className={styles.itemContent}>
                    {picture ? <img className={styles.itemImage} src={picture} /> : icon}
                    <div className={styles.itemDescription}>
                        <h3>{item.get('name')}</h3>
                        {item.get('alcoholFree') && 
                            <span className={styles.alcFree}>Alcohol free</span>
                        }
                    </div>
                    <span className={styles.priceTag}>{`${item.get('price')}kr`}</span>
                    <Add onClick={add} className={styles.addToCart} color="#a5d8c7" size="32" />
                </div>
                <div className={styles.divider}/>
            </div>
        )
    }
}