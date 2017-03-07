import React, {Component} from 'react';
import styles from './styles/EventCartItem.css';
import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';

export default class EventCartItem extends Component {

    constructor() {
        super();
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    add() {
        this.props.add(this.props.item);
    }

    remove() {
        this.props.remove(this.props.item.get('id'));
    }

    render() {
        const {item} = this.props;
        return (
            <div className={styles.cartItem}>
                <div className={styles.itemContent}>
                    <div className={styles.controlPanel}>
                        <Minus onClick={this.remove}  color="#34495e" size="32" />
                        <span className={styles.itemCounter}>{item.get('count')}</span>
                        <Plus onClick={this.add} color="#34495e" size="32" />
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
}

function getPrice(count, price) {
    const fullPrice = count * price;
    return `${fullPrice} kr`;
}