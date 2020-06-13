import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import {Mount, ThemeContext} from '../../../tests/helpers';
import TabBar from '../index';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

const items = [
  {displayName: 'adoções', key: 'adocoes'},
  {displayName: 'favoritos', key: 'favoritos'},
  {displayName: 'solicitações', key: 'solicitacoes'},
];

const defaultProps = {
  onPress: jest.fn().mockName('onPress'),
  items,
};

const mountFactory = propOverrides => {
  const tabBarProps = {...defaultProps, ...propOverrides};

  const element = Mount(<TabBar {...tabBarProps} />);

  return element;
};

describe('TabBar', () => {
  it('calls onPress callback', () => {
    const cb = jest.fn();

    const {getByText} = mountFactory({onPress: cb});

    fireEvent.press(getByText('FAVORITOS'));

    expect(cb).toHaveBeenCalledWith('favoritos');
  });

  it('highlights selected tab', () => {
    const {getByText} = mountFactory({indexOfStartSelected: 1});

    expect(getByText('FAVORITOS')).toHaveStyle({opacity: 1});
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(ThemeContext(<TabBar items={defaultProps.items} onPress={defaultProps.onPress} />))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
