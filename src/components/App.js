import React, { Component } from 'react';
import './styles/App.css';
import './styles/FlatButton.css';
import AppHeader from './AppHeader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


function getRouteTransition(path) {
  let currPath = path.split('/')[1];
  return `route-transition-${currPath}`;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader location={this.props.location} />
            <ReactCSSTransitionGroup
              component="div"
              className="RouteContainer"
              transitionName={getRouteTransition(this.props.location.pathname)}
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