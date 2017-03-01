import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import EventListItem from '../components/EventListItem';
import Loader from 'components/Loader/Loader';
//Actions
import { setupEventListSubscription, eventLoading } from 'actions/event';
import { updateCanGoBack } from 'actions/app';

//Styles
import styles from './styles/EventList.css';

class EventList extends Component  {


    componentWillMount() {
        this.props.eventLoading();
        this.props.setupEventListSubscription();
        this.props.updateCanGoBack(true);
    }

    render() {
        return (
            <div className={styles.eventListScreen}>
                <Loader show={this.props.loading} />
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
        events: state.event.eventlist,
        loading: state.event.event.get('eventDataLoading')
    }
}

const mapDispatchToProps = {
    setupEventListSubscription,
    updateCanGoBack,
    eventLoading
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventList);