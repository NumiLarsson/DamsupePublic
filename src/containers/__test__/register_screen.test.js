import React from 'react';
import ReactDOM from 'react-dom';
import RegisterScreen from '../register_screen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterScreen />, div);
});
