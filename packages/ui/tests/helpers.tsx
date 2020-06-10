import React, {ReactElement} from 'react';
import {render} from '@testing-library/react-native';
import {ThemeContextProvider, PossibleThemes} from '@animavita/theme';

export const ThemeContext = (children: ReactElement, theme?: PossibleThemes) => (
  <ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>
);
export const Mount = (children: ReactElement, theme?: PossibleThemes) =>
  render(<ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>);
