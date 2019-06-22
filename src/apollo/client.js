import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjwy764420xxs0185sx3a5pd3',
});

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjwy764420xxs0185sx3a5pd3',
  options: { reconnect: true },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache,
});

export default client;
