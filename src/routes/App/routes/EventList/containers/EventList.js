import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import EventListItem from '../components/EventListItem';

//Actions
import { setupEventListSubscription } from 'actions/event';
import { updateCanGoBack } from 'actions/app';

//Styles
import styles from './styles/EventList.css';

class EventList extends Component  {


    componentWillMount() {
        this.props.setupEventListSubscription();
        this.props.updateCanGoBack(true);
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

const mapStateToProps = (state) => {
    return {
        events: state.event.eventlist
    }
}

const mapDispatchToProps = {
    setupEventListSubscription,
    updateCanGoBack
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventList);