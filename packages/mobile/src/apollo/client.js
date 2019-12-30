import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache, split } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { getToken } from '~/utils/helpers';
import { APP_SERVER } from '~/utils/constants';

const httpLink = new HttpLink({
  uri: `${APP_SERVER}/graphql`
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
  uri: `${APP_SERVER}/subscriptions`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: async () => {
      const token = await getToken();
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      };
    }
  }
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
  onError: e => console.log(e)
});

export default client;
