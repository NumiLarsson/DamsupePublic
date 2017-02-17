import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//Global styles.
import transitions from 'styles/routing.css';
require('../styles/spinners.css');
require('../styles/buttons.css');

//TODO: Use css modules.
import styles from './styles/App.css';


function getRouteTransition(path) {
  if (path === '/') {
    return 'route-transition-home';
  }
  let currPath = path.split('/')[1];
  return `route-transition-${currPath}`;
}

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <ReactCSSTransitionGroup
              component="div"
              className={styles.routeContainer}
              transitionName={transitions}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              
              {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
            })}
          </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;