import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import EventListItem from '../components/EventListItem';

//Actions
import { setupEventListSubscription } from 'actions/event';

//Styles
import styles from './styles/EventList.css';

class EventList extends Component  {


    componentWillMount() {
        this.props.setupEventListSubscription();
    }

    render() {
        return (
            <div className={styles.eventListScreen}>
                <ul className={styles.eventList}>
                    {this.props.events.map(event => {
                        let id = event.get('id');
                        return <EventListItem key={id} name={event.get('name')} active={event.get('active')} eventId={id} />
                    })}
                </ul>
            </div>
        )
    }
    
}
//this.renderEvents(this.props.events)
const mapStateToProps = (state) => {
    return {
        events: state.event.eventlist
    }
}

const mapDispatchToProps = {
    setupEventListSubscription
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventList);