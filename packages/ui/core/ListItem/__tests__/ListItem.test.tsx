import React from 'react';
import {Text} from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import {Mount, ThemeContext} from '../../../tests/helpers';
import ListItem from '../index';

const defaultProps = {
  onPress: jest.fn().mockName('onPress'),
};

const mountFactory = propOverrides => {
  const {children} = propOverrides;
  const listItemProps = {...defaultProps, ...propOverrides};

  const element = Mount(<ListItem {...listItemProps}>{children}</ListItem>);

  return element;
};

describe('List Item', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onPress', () => {
    const cb = jest.fn();
    const {getByText} = mountFactory({children: <Text>Press me!</Text>, onPress: cb});

    fireEvent.press(getByText('Press me!'));

    expect(cb).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const tree = renderer.create(ThemeContext(<ListItem gradient onPress={defaultProps.onPress} />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
