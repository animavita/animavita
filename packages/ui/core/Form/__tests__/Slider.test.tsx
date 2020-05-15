import React from 'react';
import renderer from 'react-test-renderer';

import {ThemeContext} from '../../../tests/helpers';
import Slider from '../Slider';

const defaultProps = {
  minimum: 1,
  maximum: 50,
  value: 5,
  suffix: 'km',
  testID: 'slider',
  onValueChange: jest.fn().mockName('onChangeValue'),
};

const mountFactory = propOverrides => {
  const sliderProps = {...defaultProps, ...propOverrides};

  const element = ThemeContext(<Slider {...sliderProps} />);
  return element;
};

describe('Slider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(mountFactory({})).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
