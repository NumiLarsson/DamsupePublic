import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTransitionGroup from 'react-addons-transition-group';
import Header from 'components/App/Header';
import { signOut } from 'actions/user';

//TODO: Use css modules.
import styles from './styles/App.css';

class App extends Component {
  render() {
    let { isAuthenticated, loading, children, signOut, eventIsChosen, currentEventName} = this.props;
    return (
      <div className={styles.app}>
        <Header 
          show={isAuthenticated && !loading} 
          signOut={signOut} 
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
    isAuthenticated: state.auth.authenticated,
    loading: state.app.loading,
    eventIsChosen: state.event.event.get('eventChosen'),
    currentEventName: state.event.event.get('name')
  }
}

const mapDispatchToProps = {
  signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(App);