
import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import LeistungenScreen from '../../screens/LeistungenScreen';

jest.useFakeTimers()

describe('LeistungenScreen', () => {
  it('renders correctly', () => {
    const leistungenScreen = renderer.create(
      <LeistungenScreen />
    ).toJSON();
    expect(leistungenScreen).toMatchSnapshot();
  });
});