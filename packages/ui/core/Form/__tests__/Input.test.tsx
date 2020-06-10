import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {StyledTheme} from '@animavita/theme';

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

  describe('theme variations', () => {
    it('renders text color dark', () => {
      const {getByLabelText} = Mount(<Input accessibilityLabel="username" />, 'light');
      expect(getByLabelText('username')).toHaveStyle({color: StyledTheme.black});
    });

    it('renders text color light', () => {
      const {getByLabelText} = Mount(<Input accessibilityLabel="username" />, 'dark');
      expect(getByLabelText('username')).toHaveStyle({color: StyledTheme.white});
    });
  });

  it('renders correctly', () => {
    const cb = jest.fn();
    const tree = renderer.create(ThemeContext(<Input onChangeText={cb} accessibilityLabel="username" />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
