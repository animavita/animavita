import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache, split } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { getUser } from '~/utils/helpers';

const httpLink = new HttpLink({
  uri: 'http://10.10.10.9:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const { token } = await getUser();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjwy764420xxs0185sx3a5pd3',
  options: {
    reconnect: true,
    connectionParams: async () => {
      const { token } = await getUser();
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link,
  cache,
  onError: e => console.log(e),
});

export default client;
