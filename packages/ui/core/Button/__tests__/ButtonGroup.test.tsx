import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import {Mount, ThemeContext} from '../../../tests/helpers';
import ButtonGroup from '../ButtonGroup';

const defaultProps = {
  data: [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
  ],
  onChange: jest.fn().mockName('onPrevious'),
  value: '1',
};

const mountFactory = propOverrides => {
  const buttonProps = {...defaultProps, ...propOverrides};

  const element = Mount(<ButtonGroup {...buttonProps} />);

  return element;
};

describe('Header component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('renders correcly', () => {
    it('match snapshot', () => {
      const tree = renderer
        .create(
          ThemeContext(
            <ButtonGroup data={defaultProps.data} onChange={defaultProps.onChange} value={defaultProps.value} />,
          ),
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render labels', () => {
      const {getByText} = mountFactory({});

      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
    });
  });

  it('calls onChange with correct value', () => {
    const cb = jest.fn();
    const {getByText} = mountFactory({onChange: cb});

    fireEvent.press(getByText('Option 2'));

    expect(cb).toHaveBeenCalledWith('2');
  });
});
