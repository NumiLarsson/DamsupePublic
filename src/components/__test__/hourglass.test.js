import React from 'react';
import ReactDOM from 'react-dom';
import HourGlass from '../hourglass';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HourGlass />, div);
});
