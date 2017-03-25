import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

const notificationStyle = {
    NotificationItem: {
        DefaultStyle: {
            color: '#fff',
            border: 'none',
            textTransform: 'uppercase'
        },
        error: {
            backgroundColor: 'red',
        },
        success: {
            backgroundColor: 'green'
        }
    },
    Dismiss: {
        DefaultStyle: {
            color: '#fff',
            backgroundColor: 'transparent',
            fontSize: '2em'
        }
    }
}

class NotificationContainer extends Component {

  componentWillReceiveProps(newProps) {
    const { message, level, position } = newProps.notification;
    this.notificationSystem.addNotification({
      message,
      level,
      position
    });
  }

  render() {
    return (
      <NotificationSystem style={notificationStyle} ref={r => this.notificationSystem = r} />
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.app.get('notification')
  };
}

export default connect(
  mapStateToProps
)(NotificationContainer);