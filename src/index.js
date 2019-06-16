import React from 'react';
import { createRootNavigator } from './routes';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import client from './services/client';
import '~/config/ReactotronConfig';

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
      <Routes />
      </ApolloHooksProvider>
    </ApolloProvider>
  )
};

export default App;
