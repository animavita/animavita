import React, { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createRootNavigator } from './routes';
import client from './apollo/client';
import '~/config/ReactotronConfig';
import { getToken } from '~/utils/helpers';
import { store, persistor } from './store';
import Loading from '~/components/Loading';

const App = () => {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const token = await getToken();
    if (token) {
      setSigned(!!token);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const Routes = createRootNavigator(signed);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
