import React, {Suspense} from 'react';
import {RelayEnvironmentProvider, Environment} from '@animavita/relay';
import {ThemeContextProvider} from '@animavita/theme';
import {I18nProvider} from '@animavita/i18n';

import LoadingScreen from './src/modules/common/LoadingScreen';
import NavigationContainer from './src/navigation';

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RelayEnvironmentProvider environment={Environment}>
        <ThemeContextProvider>
          <I18nProvider>
            <NavigationContainer />
          </I18nProvider>
        </ThemeContextProvider>
      </RelayEnvironmentProvider>
    </Suspense>
  );
}
