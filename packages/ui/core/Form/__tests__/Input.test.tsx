import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import {Mount, ThemeContext} from '../../../tests/helpers';
import Input from '../Input';

describe('Input', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onChangeText', () => {
    const cb = jest.fn();

    const {getByLabelText} = Mount(<Input onChangeText={cb} accessibilityLabel="username" />);

    fireEvent.changeText(getByLabelText('username'), 'a');

    expect(cb).toHaveBeenCalledWith('a');
  });

  it('renders correctly', () => {
    const cb = jest.fn();
    const tree = renderer.create(ThemeContext(<Input onChangeText={cb} accessibilityLabel="username" />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
