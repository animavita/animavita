import React from 'react';
import {DefaultTheme, withTheme} from 'styled-components/native';

import {Touchable, StyledLinearGradient, Text} from './styles';
import {
  ButtonComponentType,
  ButtonActive,
  ButtonDisabled,
  ButtonTextColor,
  ButtonProps,
  gradientConfig,
  SMALL as TEXT_SMALL,
} from './types';

function getColor(
  theme: DefaultTheme,
  disabled?: ButtonDisabled,
  color?: ButtonTextColor,
  active?: ButtonActive,
): string {
  if (disabled) return theme.grey;
  if (color) return color;
  if (active) return theme.white;

  return theme.greenLight;
}

const Button: ButtonComponentType = ({text, theme, children, ...props}) => {
  const {active, gradient, disabled, rounded, outline, size, textColor: color} = props;

  const textColor = getColor(theme, disabled, color, active || gradient);
  const textSize = size === TEXT_SMALL ? 'body' : 'title-3';
  const {locations, start, end} = gradientConfig;

  if (__DEV__) {
    if (disabled && (active || gradient)) console.warn("You can't use `gradient` prop when your button is disabled.");
    if (rounded && !outline && !gradient && !active)
      console.warn('To use `rounded` prop you need the `outline`, `gradient` or `active` prop as well.');
    if (outline && (active || gradient))
      console.warn("You can't use `outline` prop combined with `gradient` or `active` props.");
    if (children && text) console.warn("You can't use `title` prop combined with `children`. Use only one of both.");
  }

  return (
    <Touchable {...props}>
      {!disabled && (active || gradient) ? (
        <StyledLinearGradient
          size={size}
          locations={locations}
          start={start}
          end={end}
          colors={[theme.greenDark, theme.greenLight]}
          active={active}
          rounded={rounded}
          gradient={gradient}>
          {children ? (
            children
          ) : (
            <Text variant={textSize} color={textColor} type="bold">
              {text}
            </Text>
          )}
        </StyledLinearGradient>
      ) : children ? (
        children
      ) : (
        <Text variant={textSize} color={textColor} type="bold">
          {text}
        </Text>
      )}
    </Touchable>
  );
};

export default withTheme(Button) as React.FC<ButtonProps>;
