import {GraphQLID, GraphQLObjectType, GraphQLNonNull} from 'graphql';

import {GraphQLContext} from '../types';
import {nodeField} from '../interfaces/NodeInterface';
import {fromGlobalId} from 'graphql-relay';
import {UserLoader} from '../loaders';
import UserType from '../modules/user/UserType';

export default new GraphQLObjectType<any, GraphQLContext, any>({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, context) => {
        const {id} = fromGlobalId(args.id);
        return UserLoader.load(context, id);
      },
    },
  }),
});
