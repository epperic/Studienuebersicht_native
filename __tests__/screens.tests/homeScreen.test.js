
import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import HomeScreen from '../../screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const homeScreen = renderer.create(
      <HomeScreen />
    ).toJSON();
    expect(homeScreen).toMatchSnapshot();
  });
});