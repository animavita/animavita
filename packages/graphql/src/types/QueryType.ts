import {GraphQLObjectType} from 'graphql';

import {GraphQLContext} from '../types';
import {nodeField} from '../interfaces/NodeInterface';
import {userQuerys} from '../modules/user/UserQuery';
import {AdoptionsQueries} from '../modules/adoption/AdoptionQuery';

export default new GraphQLObjectType<any, GraphQLContext, any>({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    ...userQuerys,
    ...AdoptionsQueries,
  }),
});
