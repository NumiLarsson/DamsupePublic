import React from 'react';
import ReactDOM from 'react-dom';
import SplashScreen from '../splash';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SplashScreen />, div);
});
