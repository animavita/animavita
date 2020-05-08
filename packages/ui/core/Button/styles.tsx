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

export const LargeSizeStyle = css<{gradient?: ButtonActive; active?: ButtonActive}>`
  padding: ${({gradient, active}) => {
    if (gradient || active) return `${px2ddp(6 + 0.8)}px ${px2ddp(12 + 0.8)}px`;

    return `${px2ddp(6)}px ${px2ddp(12)}px`;
  }};
`;

export const SmallSizeStyle = css<{gradient?: ButtonActive; active?: ButtonActive}>`
  padding: ${({gradient, active}) => {
    if (gradient || active) return `${px2ddp(4 + 0.8)}px ${px2ddp(10 + 0.8)}px`;

    return `${px2ddp(4)}px ${px2ddp(10)}px`;
  }};
`;

export const TouchableStyle = css<{
  active?: ButtonActive;
  gradient?: ButtonActive;
  outline?: ButtonOutline;
  rounded?: ButtonRounded;
  disabled?: ButtonDisabled;
  size: ButtonSize;
}>`
  ${({outline, active, gradient}) => {
    if (!outline || active || gradient) return;

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

export const StyledLinearGradient = styled(LinearGradient)<{
  rounded?: ButtonRounded;
  gradient?: ButtonActive;
  active?: ButtonActive;
  size: ButtonSize;
}>`
  ${({size}) => {
    switch (size) {
      case LARGE:
        return LargeSizeStyle;
      case SMALL:
        return SmallSizeStyle;
    }
  }}
  ${({rounded, gradient, active}) => {
    if (!rounded && (gradient || active)) return;
    return RoundedStyle;
  }}
`;

export const Text = styled(Typography)`
  text-align: center;
`;
