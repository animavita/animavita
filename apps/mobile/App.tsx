import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import { PostHogProvider } from 'posthog-react-native';
import { I18nextProvider } from 'react-i18next';

import { initI18n } from './src/i18n/i18n.config';

import MainNavigator from '@/navigation/main-navigator';
import { AuthProvider } from '@/providers/auth-provider';
import queryClient from '@/services/query-client-instance';
import theme from '@/theme';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <PostHogProvider
          apiKey="phc_gx8bzWv7D9lGd232EgOrXEiWmfdMMhplEMiFnp8mIZV"
          options={{
            host: 'https://us.i.posthog.com',
          }}
        >
          <NativeBaseProvider theme={theme}>
            <I18nextProvider i18n={initI18n('pt-BR')}>
              <AuthProvider>
                <MainNavigator />
              </AuthProvider>
            </I18nextProvider>
          </NativeBaseProvider>
        </PostHogProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
