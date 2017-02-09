import React, { Component } from 'react';
import './styles/App.css';
import './styles/FlatButton.css';
import AppHeader from './AppHeader';
import RouteContainer from './RouteContainer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class App extends Component {
  render() {
    return (
      <div className="App">
            <AppHeader location={this.props.location} />
            <ReactCSSTransitionGroup
              component="div"
              className="RouteContainer"
              transitionName="route-transition" 
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
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