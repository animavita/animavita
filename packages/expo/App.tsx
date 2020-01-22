import React from 'react';

import {ThemeContextProvider} from '@animavita/theme';

import NavigationContainer from './src/navigation';

export default function App() {
  return (
    <ThemeContextProvider>
      <NavigationContainer />
    </ThemeContextProvider>
  );
}
