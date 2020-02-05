import {GraphQLSchema} from 'graphql';

import QueryType from './types/QueryType';

const schema = new GraphQLSchema({
  query: QueryType,
});

export default schema;
