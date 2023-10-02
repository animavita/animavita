import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import { I18nextProvider } from 'react-i18next';

import { initI18n } from './src/i18n/i18n.config';

import MainNavigator from '@/navigation/main-navigator';
import { AuthProvider } from '@/providers/auth-provider';
import { OnBoardingProvider } from '@/providers/onboarding-provider';
import queryClient from '@/services/query-client-instance';
import theme from '@/theme';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <I18nextProvider i18n={initI18n('pt-BR')}>
          <AuthProvider>
            <OnBoardingProvider>
              <MainNavigator />
            </OnBoardingProvider>
          </AuthProvider>
        </I18nextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
