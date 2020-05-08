import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {StyledTheme} from '@animavita/theme';

import {Mount, ThemeContext} from '../../../tests/helpers';
import Button from '../Button';

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const cb = jest.fn();

  it('calls onPress', () => {
    const {getByText} = Mount(<Button text="Title" size="small" onPress={cb} />);

    fireEvent.press(getByText('Title'));

    expect(cb).toHaveBeenCalled();
  });

  describe('textColor variations', () => {
    it('renders disabled color', () => {
      const {getByText} = Mount(<Button text="Title" size="small" disabled onPress={cb} />);

      expect(getByText('Title')).toHaveStyle({color: StyledTheme.grey});
    });

    it('renders custom color', () => {
      const {getByText} = Mount(<Button text="Title" size="small" textColor="red" onPress={cb} />);

      expect(getByText('Title')).toHaveStyle({color: 'red'});
    });

    it('renders active/gradient color', () => {
      const {getByText} = Mount(<Button text="Title" size="small" gradient onPress={cb} />);

      expect(getByText('Title')).toHaveStyle({color: StyledTheme.white});
    });
  });

  describe('textSize variations', () => {
    it('renders body font size', () => {
      const {getByText, debug} = Mount(<Button text="Title" size="small" disabled onPress={cb} />);

      expect(getByText('Title')).toHaveStyle({fontSize: parseFloat(StyledTheme.sizeBody)});
    });

    it('renders title-2 font size', () => {
      const {getByText, debug} = Mount(<Button text="Title" size="large" disabled onPress={cb} />);

      expect(getByText('Title')).toHaveStyle({fontSize: parseFloat(StyledTheme.sizeTitle3)});
    });
  });

  describe('when violate the constraints', () => {
    beforeEach(() => {
      global.console = {warn: jest.fn()};
    });

    it('logs disabled and gradient warn', () => {
      Mount(<Button text="Title" disabled gradient size="small" onPress={cb} />);

      expect(console.warn).toHaveBeenCalledWith("You can't use `gradient` prop when your button is disabled.");
    });

    it('logs rounded warn', () => {
      Mount(<Button text="Title" rounded size="small" onPress={cb} />);

      expect(console.warn).toHaveBeenCalledWith(
        'To use `rounded` prop you need the `outline`, `gradient` or `active` prop as well.',
      );
    });

    it('logs outline warn', () => {
      Mount(<Button text="Title" outline gradient size="small" onPress={cb} />);

      expect(console.warn).toHaveBeenCalledWith(
        "You can't use `outline` prop combined with `gradient` or `active` props.",
      );
    });

    it('logs children and title warn', () => {
      Mount(
        <Button text="Title" size="small" onPress={cb}>
          <></>
        </Button>,
      );

      expect(console.warn).toHaveBeenCalledWith(
        "You can't use `title` prop combined with `children`. Use only one of both.",
      );
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(ThemeContext(<Button text="Title" size="small" rounded gradient onPress={cb} />))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
