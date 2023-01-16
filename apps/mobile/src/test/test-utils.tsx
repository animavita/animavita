import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

import { initI18n } from '../i18n/i18n.config';
import theme from '../theme';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const renderWithProviders = (children: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
          <I18nextProvider i18n={initI18n('pt-BR')}>{children}</I18nextProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export * from '@testing-library/react-native';
export { renderWithProviders };
