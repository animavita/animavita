import {GraphQLFieldConfigMap, GraphQLNonNull, GraphQLID} from 'graphql';
import {fromGlobalId} from 'graphql-relay';

import {GraphQLContext} from '../../../../../types';
import UserType from '../../UserType';

import * as UserLoader from './UserLoader';

const userQueries: GraphQLFieldConfigMap<any, GraphQLContext, any> = {
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
  me: {
    type: UserType,
    resolve: (obj, args, context) => {
      const {user} = context;
      if (!user || !user.id) return null;
      return UserLoader.load(context, user.id);
    },
  },
};

export default userQueries;
