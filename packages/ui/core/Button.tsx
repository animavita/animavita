import React from 'react';
import styled, {css, DefaultTheme, withTheme} from 'styled-components/native';
import {TouchableOpacityProps} from 'react-native';
import {px2ddp} from '@animavita/theme';

import Typography from './Typography';

// types
const PRIMARY = 'primary';
const OUTLINE = 'outline';
// sizes
const LARGE = 'large';
const SMALL = 'small';

const DisabledStyle = css`
  cursor: no-drop;
`;
const PrimaryTypeStyle = css<{disabled?: boolean}>`
  border-radius: ${() => `${px2ddp(10)}px`};
  ${({disabled}) =>
    disabled
      ? css`
          background-color: ${({theme}) => theme.greyLight};
          ${DisabledStyle}
        `
      : css`
          background-image: linear-gradient(
            to right,
            ${({theme}) => theme.greenDark},
            ${({theme}) => theme.greenLight}
          );
        `}
`;
const OutlineTypeStyle = css<{disabled?: boolean}>`
  background-color: transparent;
  border-radius: ${px2ddp(10)}px;
  border-width: ${px2ddp(1)}px;
  border-color: ${({theme, disabled}) => (disabled ? theme.grey : theme.greenLight)};
  ${({disabled}) => disabled && DisabledStyle}
`;
const LargeSizeStyle = css`
  padding: ${px2ddp(20)}px ${px2ddp(40)}px;
`;
const SmallSizeStyle = css`
  padding: ${px2ddp(8)}px ${px2ddp(40)}px;
`;
const TouchableStyle = css<{type: ButtonType; size: ButtonSize}>`
  ${({type}) => {
    switch (type) {
      case PRIMARY:
        return PrimaryTypeStyle;
      case OUTLINE:
        return OutlineTypeStyle;
    }
  }}
  ${({size}) => {
    switch (size) {
      case LARGE:
        return LargeSizeStyle;
      case SMALL:
        return SmallSizeStyle;
    }
  }}
`;

const Touchable = styled.TouchableOpacity<{type: ButtonType; size: ButtonSize}>`
  ${TouchableStyle}
`;
const Text = styled(Typography)`
  text-align: center;
`;

type ButtonType = typeof PRIMARY | typeof OUTLINE;
type ButtonSize = typeof LARGE | typeof SMALL;

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  type: ButtonType;
  size: ButtonSize;
  disabled?: boolean;
}

type ButtonComponentType = React.FC<ButtonProps & {theme: DefaultTheme}>;

const Button: ButtonComponentType = ({text, theme, ...props}) => {
  const {type, disabled} = props;

  const primaryTextColor = disabled ? theme.grey : theme.white;
  const outlineTextColor = disabled ? theme.grey : theme.greenLight;

  const color = type === PRIMARY ? primaryTextColor : outlineTextColor;
  return (
    <Touchable {...props}>
      <Text variant="body" color={color} type="bold">
        {text}
      </Text>
    </Touchable>
  );
};

export default withTheme(Button) as React.FC<ButtonProps>;
