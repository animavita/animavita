import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import {Mount, ThemeContext} from '../../../tests/helpers';
import Header from '../index';

const defaultProps = {
  title: 'Header',
  onPrevious: jest.fn().mockName('onPrevious'),
};

const mountFactory = propOverrides => {
  const headerProps = {...defaultProps, ...propOverrides};

  const element = Mount(<Header {...headerProps} />);

  return element;
};

describe('Header component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('renders correctly', () => {
    it('match snapshot', () => {
      const tree = renderer
        .create(ThemeContext(<Header title={defaultProps.title} onPrevious={defaultProps.onPrevious} />))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render title', () => {
      const {getByText} = mountFactory({title: 'Header'});

      expect(getByText('Header')).toBeTruthy();
    });
  });

  it('calls onPrevious', () => {
    const cb = jest.fn();
    const {getByTestId} = mountFactory({title: 'Header', onPrevious: cb});

    fireEvent.press(getByTestId('backButton'));

    expect(cb).toHaveBeenCalled();
  });
});
