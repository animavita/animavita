import {GraphQLSchema} from 'graphql';

import QueryType from './types/QueryType';
import MutationType from './types/MutationType';

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default schema;
