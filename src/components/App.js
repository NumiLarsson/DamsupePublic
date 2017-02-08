import React, { Component } from 'react';
import './styles/App.css';
import AppHeader from './AppHeader';

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