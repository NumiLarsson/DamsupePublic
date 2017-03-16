import React, {Component} from 'react';
import { connect } from 'react-redux';

//Components
import EventListItem from '../components/EventListItem';
import Loader from 'components/Loader/Loader';
//Actions
import { initializeEventList, cleanupEventList } from 'actions/event';

//Styles
import styles from './styles/EventList.css';

class EventList extends Component  {


    componentWillMount() {
        this.props.initializeEventList();
    }

    componentWillUnmount() {
        this.props.cleanupEventList();
    }

    render() {
        return (
            <div className={styles.eventListScreen}>
                <Loader show={this.props.loading} />
                <div className={styles.eventList}>
                    {this.props.events.map(event => {
                        let id = event.get('id');
                        return <EventListItem 
                                    key={id} 
                                    name={event.get('name')}
                                    date={event.get('date')}
                                    headerImage={event.get('headerImage')}
                                    start={event.get('start')}
                                    end={event.get('end')} 
                                    type={event.get('type')} 
                                    active={event.get('active')} 
                                    eventId={id} />
                    })}
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        events: state.event.eventlist,
        loading: state.event.event.get('loading')
    }
}

const mapDispatchToProps = {
    initializeEventList,
    cleanupEventList
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventList);