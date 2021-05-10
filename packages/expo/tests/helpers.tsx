import React, {ReactElement} from 'react';
import {render} from '@testing-library/react-native';
import {ThemeContextProvider} from '@animavita/theme';
import {I18nProvider} from '@animavita/i18n';

export const Mount = (children: ReactElement) =>
  render(
    <I18nProvider>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </I18nProvider>,
  );
