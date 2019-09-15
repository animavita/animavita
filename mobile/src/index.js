import React, { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';

import { createRootNavigator } from './routes';
import client from './apollo/client';
import '~/config/ReactotronConfig';
import { getUser } from '~/utils/helpers';
import store from './store';
import Loading from '~/components/Loading';

const App = () => {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const { user } = await getUser();
    if (user) {
      setSigned(!!user);
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
        <Routes />
        <FlashMessage position="top" />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
