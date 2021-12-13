
import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SemesterScreen from '../../screens/SemesterScreen';
jest.useFakeTimers()

describe('SemesterScreen', () => {
  it('renders correctly', () => {
    const semesterScreen = renderer.create(
      <SemesterScreen />
    ).toJSON();
    expect(semesterScreen).toMatchSnapshot();
  });
});