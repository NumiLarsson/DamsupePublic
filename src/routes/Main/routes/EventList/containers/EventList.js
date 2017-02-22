import React, {Component} from 'react';
import { connect } from 'react-redux';

//Styles
import styles from './styles/EventList.css';

class EventList extends Component  {

    render() {
        return (
            <div className={styles.eventList}>
   
            </div>
        )
    }
    
}


module.exports = connect(null, null)(EventList);