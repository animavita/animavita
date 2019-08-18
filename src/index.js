import React, { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { createRootNavigator } from './routes';
import client from './apollo/client';
import '~/config/ReactotronConfig';
import { getUser } from '~/utils/helpers';
import store from './store';

const App = () => {
  const [signed, setSigned] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function getData() {
    const { user } = getUser();
    setLoaded(true);
    setSigned(!!user);
  }

  useEffect(() => {
    getData();
  }, []);

  if (!loaded) {
    return null;
  }

  const Routes = createRootNavigator(signed);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Routes />
        <FlashMessage position="top" />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
