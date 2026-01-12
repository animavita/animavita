import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import { PostHogProvider } from 'posthog-react-native';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { initI18n } from './src/i18n/i18n.config';

import MainNavigator from '@/navigation/main-navigator';
import queryClient from '@/services/query-client-instance';
import { AuthProvider } from '@/state/auth-provider';
import theme from '@/theme';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <PostHogProvider
          apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
          options={{
            host: 'https://us.i.posthog.com',
            disabled: process.env.EXPO_PUBLIC_POSTHOG_API_KEY === 'dev',
          }}
        >
          <GestureHandlerRootView>
            <NativeBaseProvider theme={theme}>
              <I18nextProvider i18n={initI18n('pt-BR')}>
                <AuthProvider>
                  <MainNavigator />
                </AuthProvider>
              </I18nextProvider>
            </NativeBaseProvider>
          </GestureHandlerRootView>
        </PostHogProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
