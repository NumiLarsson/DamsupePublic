import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTransitionGroup from 'react-addons-transition-group';
import Header from 'components/App/Header';
import { signOut } from 'actions/user';

//TODO: Use css modules.
import styles from './styles/App.css';

class App extends Component {
  render() {
    let {children, signOut, eventIsChosen, currentEventName, location} = this.props;
    const path = location.pathname.split('/');
    return (
      <div className={styles.app}>
        <Header 
          show={path[1] === 'app'} 
          signOut={signOut} 
          location={location}
          eventIsChosen={eventIsChosen} 
          currentEvent={currentEventName}/>
        <ReactTransitionGroup component="div" className={styles.routeContainer}>
              {React.cloneElement(children, {
                key: this.props.location.pathname
            })}
          </ReactTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.get('authenticated'),
    eventIsChosen: state.event.event.get('eventChosen'),
    currentEventName: state.event.event.get('name')
  }
}

const mapDispatchToProps = {
  signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(App);