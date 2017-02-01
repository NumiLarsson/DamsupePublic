import React from 'react';
import ReactDOM from 'react-dom';
import LoginScreen from '../login_screen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginScreen />, div);
});
