import React, {Component} from 'react';
import { connect } from 'react-redux';
import api from '../../../../../api/Api';
import './styles/EventList.css';

class EventList extends Component {
    render() {
        return (
            <div className="eventlist">
                <button onClick={this.props.signOut}>Logout</button>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        signOut: () => api.auth.signOut().then(()=> {
            dispatch({type: 'USER_LOGGED_OUT'});
        })
    }
}

module.exports = connect(null, mapDispatchToProps)(EventList);