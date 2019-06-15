import React from 'react';
import { createRootNavigator } from './routes';

import '~/config/ReactotronConfig';

const App = () => {
  const signed = true;
  const signLoaded = true;

  if (!signLoaded) {
    return null;
  }

  const Routes = createRootNavigator(signed);
  return <Routes />;
};

export default App;
