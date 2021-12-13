
import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { LoadingCircle } from '../../components/LoadingCircle';
jest.useFakeTimers()

describe('Loading circle', () => {
  it('renders correctly', () => {
    const loadincCircle = renderer.create(
      <LoadingCircle />
    ).toJSON();
    expect(loadincCircle).toMatchSnapshot();
  });
});