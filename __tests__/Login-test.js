// __tests__/Login-page-test.js
import 'react-native';
import React from 'react';
import Login from '../src/screens/Login';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
