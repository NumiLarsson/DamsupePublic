import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTransitionGroup from 'react-addons-transition-group';
import Header from 'components/App/Header';
import { signOut } from 'actions/user';

//TODO: Use css modules.
import styles from './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Header signOut={this.props.signOut}/>
        <ReactTransitionGroup component="div" className={styles.routeContainer}>
              {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
            })}
          </ReactTransitionGroup>
      </div>
    );
  }
}


const mapDispatchToProps = {
  signOut
}

export default connect(null, mapDispatchToProps)(App);