
import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AddScreen from '../../screens/AddScreen';
jest.useFakeTimers()

describe('Addscreen', () => {
  it('renders correctly', () => {
    const addScreen = renderer.create(
      <AddScreen />
    ).toJSON();
    expect(addScreen).toMatchSnapshot();
  });
});