import React, {ReactElement} from 'react';
import {render} from '@testing-library/react-native';
import {ThemeContextProvider, PossibleThemes} from '@animavita/theme';
import {I18nProvider} from '@animavita/i18n';

export const ThemeContext = (children: ReactElement, theme?: PossibleThemes) => (
  <ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>
);
export const Mount = (children: ReactElement, theme?: PossibleThemes) =>
  render(
    <I18nProvider>
      <ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>
    </I18nProvider>,
  );
