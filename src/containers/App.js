import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

//TODO: Use css modules.
import styles from './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <ReactTransitionGroup component="div" className={styles.routeContainer}>
              {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
            })}
          </ReactTransitionGroup>
      </div>
    );
  }
}

export default App;