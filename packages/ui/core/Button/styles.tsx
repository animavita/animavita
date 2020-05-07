import styled, {css} from 'styled-components/native';
import {px2ddp} from '@animavita/theme';
import {LinearGradient} from 'expo-linear-gradient';

import Typography from '../Typography';

import {ButtonActive, ButtonSize, ButtonOutline, LARGE, SMALL, ButtonRounded, ButtonDisabled} from './types';

export const DisabledStyle = css``;

export const RoundedStyle = css<{size: ButtonSize}>`
  border-radius: ${({size}) => {
    switch (size) {
      case LARGE:
        return px2ddp(15);
      case SMALL:
        return px2ddp(10);
    }
  }}px;
`;

export const OutlineTypeStyle = css<{disabled?: boolean}>`
  background-color: transparent;
  border-width: ${px2ddp(0.8)}px;
  border-color: ${({theme, disabled}) => (disabled ? theme.grey : theme.greenLight)};
  ${({disabled}) => disabled && DisabledStyle}
`;

export const LargeSizeStyle = css`
  padding: ${px2ddp(6)}px ${px2ddp(12)}px;
`;

export const SmallSizeStyle = css`
  padding: ${px2ddp(4)}px ${px2ddp(10)}px;
`;

export const TouchableStyle = css<{
  active?: ButtonActive;
  gradient?: ButtonActive;
  outline?: ButtonOutline;
  rounded?: ButtonRounded;
  disabled?: ButtonDisabled;
  size: ButtonSize;
}>`
  ${({outline}) => {
    if (!outline) return;

    return OutlineTypeStyle;
  }}
  ${({rounded}) => {
    if (!rounded) return;

    return RoundedStyle;
  }}
  ${({size, active, gradient, disabled}) => {
    if (!disabled && (active || gradient)) return;

    switch (size) {
      case LARGE:
        return LargeSizeStyle;
      case SMALL:
        return SmallSizeStyle;
    }
  }}
  justify-content: center;
`;

export const Touchable = styled.TouchableOpacity<{
  active?: ButtonActive;
  gradient?: ButtonActive;
  outline?: ButtonOutline;
  rounded?: ButtonRounded;
  disabled?: ButtonDisabled;
  size: ButtonSize;
}>`
  ${TouchableStyle}
`;

export const StyledLinearGradient = styled(LinearGradient)<{size: ButtonSize}>`
  ${({size}) => {
    switch (size) {
      case LARGE:
        return LargeSizeStyle;
      case SMALL:
        return SmallSizeStyle;
    }
  }}
  border-radius: ${px2ddp(10)}px;
`;

export const Text = styled(Typography)`
  text-align: center;
`;
