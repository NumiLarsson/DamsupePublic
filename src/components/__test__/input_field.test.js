import React, {Component} from 'react';
import InputField from '../input_field';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<InputField />, div);
});
