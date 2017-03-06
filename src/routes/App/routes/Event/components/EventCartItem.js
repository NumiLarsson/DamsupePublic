import React from 'react';
import styles from './styles/EventCartItem.css';
import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';

export default ({item, remove}) => {
    return (
        <div className={styles.cartItem} onClick={remove}>
            <div className={styles.itemContent}>
                <div className={styles.controlPanel}>
                    
                </div>
                <div className={styles.itemDescription}>
                    <h3>{item.get('name')}</h3>
                </div>
                <div className={styles.itemSummary} >
                    <span>{getPrice(item.get('count'), item.get('price'))}</span>
                </div>
            </div>
            <div className={styles.divider}/>
        </div>
    )
}

function getPrice(count, price) {
    const fullPrice = count * price;
    return `${fullPrice} kr`;
}