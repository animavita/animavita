import React, {Suspense} from 'react';

import {RelayEnvironmentProvider, Environment} from '@animavita/relay';

import {ThemeContextProvider} from '@animavita/theme';

import NavigationContainer from './src/navigation';
import LoadingScreen from './src/modules/common/LoadingScreen';

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
