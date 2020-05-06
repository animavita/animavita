
import { TouchableOpacityProps } from 'react-native';
import { DefaultTheme } from 'styled-components/native';

// gradient
export const gradientConfig = {
  start: {
    x: 0,
    y: 0
  },
  end: {
    x: 1,
    y: 1
  },
  locations: [0.1, 0.9]
};

// sizes
export const LARGE = 'large';
export const SMALL = 'small';

export type ButtonType = string;
export type ButtonActive = boolean;
export type ButtonSize = typeof LARGE | typeof SMALL;
export type ButtonRounded = boolean;
export type ButtonText = string;
export type ButtonDisabled = boolean;
export type ButtonOutline = boolean;
export type ButtonTextColor = string;

export interface ButtonProps extends TouchableOpacityProps {
  readonly rounded?: ButtonRounded,
  readonly active?: ButtonActive;
  readonly gradient?: ButtonActive;
  readonly outline?: ButtonOutline;
  readonly textColor?: ButtonTextColor,
  text: ButtonText;
  type: ButtonType;
  size: ButtonSize;
  disabled?: ButtonDisabled;
}

export type ButtonComponentType = React.FC<ButtonProps & { theme: DefaultTheme }>;
