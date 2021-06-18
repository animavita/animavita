import {GraphQLObjectType} from 'graphql';

import {GraphQLContext} from '../../../types';
import {nodeField} from '../../../interfaces/NodeInterface';
import userQueries from '../../../modules/user/presentation/routes/queries';
import adoptionsQueries from '../../../modules/adoption/AdoptionQuery';

export default new GraphQLObjectType<any, GraphQLContext, any>({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    ...userQueries,
    ...adoptionsQueries,
  }),
});
