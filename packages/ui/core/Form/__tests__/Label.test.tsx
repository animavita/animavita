import React from 'react';
import renderer from 'react-test-renderer';

import {ThemeContext} from '../../../tests/helpers';
import Label from '../Label';

describe('Label', () => {
  it('renders correctly', () => {
    const tree = renderer.create(ThemeContext(<Label>Test</Label>)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
