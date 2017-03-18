import React, { Component } from 'react';
import styles from './styles/EventListItem.css';
import { Link } from 'react-router';
import Loader from 'components/Loader/Loader';


export default class EventListItem extends Component  {
   
   constructor() {
       super();
       this.onImageLoad = this.onImageLoad.bind(this);
       this.state = {
           loaded: false
       }
   }

    onImageLoad () {
        this.setState({
            loaded: true
        });
    }

    render() {
        return (
            <Link className={styles.eventLink} to={`/app/event/${this.props.eventId}`}>
                    <div className={styles.itemContent}>
                        <div className={styles.itemImageWrapper}>
                            <Loader show={!this.state.loaded}/>
                            <img role="presentation" onLoad={this.onImageLoad} className={styles.itemImage} src={this.props.headerImage} />
                        </div>
                        <div className={styles.titleSection}>
                            <div className={styles.dateSection}>
                                <span className={styles.month}>
                                    {getMonth(this.props.date)}
                                </span>
                                <span className={styles.day}>
                                    {getDay(this.props.date)}
                                </span>
                            </div>
                            <div className={styles.nameSection}>
                                <h3>{this.props.name}</h3>
                            </div>
                            <div className={styles.timeSection}>
                                <span>{this.props.type}</span>
                                <span>{this.props.start && this.props.end &&`${this.props.start}-${this.props.end}`}</span>
                            </div>
                        </div>
                    </div>
            </Link>
        )
    }
}

function getDay(date) {
    const temp = new Date(date);
    return temp.getDate();
}

function getMonth(date) {
    const temp = new Date(date);
    const locale = "sv-SE"
    const month = temp.toLocaleString(locale, { month: "short" });
    return month.slice(0, -1);
}