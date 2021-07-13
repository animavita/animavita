import {GraphQLSchema} from 'graphql';

import QueryType from './graphql/queries';
import MutationType from './graphql/mutations';

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default schema;
