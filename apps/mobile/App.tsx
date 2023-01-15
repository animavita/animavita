import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { Provider as PaperProvider } from 'react-native-paper';

import { initI18n } from './src/i18n/i18n.config';
import MainNavigator from './src/navigation/main-navigator';
import queryClient from './src/services/query-client-instance';
import theme from './src/theme';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <I18nextProvider i18n={initI18n('pt-BR')}>
          <MainNavigator />
        </I18nextProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
