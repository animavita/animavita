import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { createRootNavigator } from './routes';
import client from './apollo/client';
import '~/config/ReactotronConfig';
import store from './store';

const App = () => {
  const signed = true;
  const signLoaded = true;

  if (!signLoaded) {
    return null;
  }

  const Routes = createRootNavigator(signed);
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default App;
