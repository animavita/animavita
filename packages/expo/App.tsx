import React from 'react';

import {RelayEnvironmentProvider, Environment} from '@animavita/relay';

import {ThemeContextProvider} from '@animavita/theme';

// TODO: update react-navigation to v5
import NavigationContainer from './src/navigation';

export default function App() {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      <ThemeContextProvider>
        <NavigationContainer />
      </ThemeContextProvider>
    </RelayEnvironmentProvider>
  );
}
