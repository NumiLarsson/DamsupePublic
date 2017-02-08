import React, { Component } from 'react';
import './styles/App.css';
import './styles/FlatButton.css';
import AppHeader from './AppHeader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class App extends Component {
  render() {
    return (
      <div className="App">
            <AppHeader location={this.props.location} />
            {this.props.children}
      </div>
    );
  }
}

export default App;