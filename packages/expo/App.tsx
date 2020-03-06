import React, {Suspense} from 'react';
import {RelayEnvironmentProvider, Environment} from '@animavita/relay';
import {ThemeContextProvider} from '@animavita/theme';

import LoadingScreen from './src/modules/common/LoadingScreen';
import NavigationContainer from './src/navigation';

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RelayEnvironmentProvider environment={Environment}>
        <ThemeContextProvider>
          <NavigationContainer />
        </ThemeContextProvider>
      </RelayEnvironmentProvider>
    </Suspense>
  );
}
