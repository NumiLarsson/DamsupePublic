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
                            <img onLoad={this.onImageLoad} className={styles.itemImage} src="http://lorempixel.com/400/200" 
                                alt="Event image"/>
                        </div>
                        <div className={styles.titleSection}>
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
