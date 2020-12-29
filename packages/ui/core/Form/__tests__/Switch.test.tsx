import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent} from '@testing-library/react-native';

import {Mount, ThemeContext} from '../../../tests/helpers';
import Switch from '../Switch';

describe('Switch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onValueChange', () => {
    const cb = jest.fn();
    const {getByLabelText} = Mount(<Switch onValueChange={cb} accessibilityLabel="switch" />);

    fireEvent(getByLabelText('switch'), 'valueChange');

    expect(cb).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const tree = renderer.create(ThemeContext(<Switch />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
