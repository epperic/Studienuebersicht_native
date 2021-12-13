
import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Form from '../../components/Form';


describe('Form', () => {
  it('renders correctly', () => {
    const form = renderer.create(
      <Form />
    ).toJSON();
    expect(form).toMatchSnapshot();
  });
});