import React from 'react';
import { DefaultTheme, withTheme } from 'styled-components/native';

import { Touchable, StyledLinearGradient, Text } from './styles';
import {
  ButtonComponentType,
  ButtonActive,
  ButtonDisabled,
  ButtonTextColor,
  ButtonProps,
  gradientConfig,
  SMALL as TEXT_SMALL,
} from './types';

function getColor(theme: DefaultTheme, disabled?: ButtonDisabled, color?: ButtonTextColor, active?: ButtonActive): string {
  if (color) return color;
  if (disabled) return theme.grey;
  if (active) return theme.white;

  return theme.greenLight;
}

const Button: ButtonComponentType = ({ text, theme, ...props }) => {
  const {
    active,
    gradient,
    disabled,
    size,
    textColor: color
  } = props;

  const textColor = getColor(theme, disabled, color, active || gradient);
  const textSize = size === TEXT_SMALL ? 'body' : 'title-3'
  const { locations, start, end } = gradientConfig;

  return (
    <Touchable {...props}>
      {active || gradient ? (
        <StyledLinearGradient size={size} locations={locations} start={start} end={end} colors={[theme.greenDark, theme.greenLight]}>
          <Text variant={textSize} color={textColor} type="bold">
            {text}
          </Text>
        </StyledLinearGradient>
      ) : (
          <Text variant={textSize} color={textColor} type="bold">
            {text}
          </Text>
        )}
    </Touchable>
  );
};

export default withTheme(Button) as React.FC<ButtonProps>;
