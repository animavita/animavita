import {commitLocalUpdate, Environment, FetchFunction, Network, RecordSource, Store} from 'relay-runtime';

const GRAPHQL_URI = 'https://9d208z4kzl.execute-api.us-east-1.amazonaws.com/prod/graphql';

const fetchQuery: FetchFunction = async (params, variables, _cacheConfig) => {
  // Fetch data from GraphQL API:
  const response = await fetch(GRAPHQL_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const json = await response.json();

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    // eslint-disable-next-line no-console
    console.log(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${params.name}' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors,
      )}`,
    );
  }

  return json;
};

export const network = Network.create(fetchQuery);

export const source = new RecordSource();
export const store = new Store(source);

const env = new Environment({
  network,
  store,
});

commitLocalUpdate(env, store => {
  store.getRoot().setValue(false, 'showBottomBar');
});

export default env;
