import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import { I18nextProvider } from 'react-i18next';

import { initI18n } from './src/i18n/i18n.config';
import MainNavigator from './src/navigation/main-navigator';
import { AuthProvider } from './src/providers/auth-provider';
import queryClient from './src/services/query-client-instance';
import theme from './src/theme';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <I18nextProvider i18n={initI18n('pt-BR')}>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </I18nextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
