import { GraphQLSchema } from 'graphql';

import QueryType from './types/QueryType';
import MutationType from './types/MutationType';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
