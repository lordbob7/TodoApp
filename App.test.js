import React from 'react';
import renderer from 'react-test-renderer';
import TodoApp from './App';

it('renders without crashing', () => {
  const rendered = renderer.create(<TodoApp />).toJSON();
  expect(rendered).toBeTruthy();
});
