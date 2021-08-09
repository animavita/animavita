import {GraphQLFieldConfigMap, GraphQLNonNull, GraphQLID} from 'graphql';

import {GraphQLContext} from '../../../../../types';
import userController from '../../controllers/userController';
import UserType from '../../UserType';

const userQueries: GraphQLFieldConfigMap<any, GraphQLContext, any> = {
  user: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: userController.index,
  },
  me: {
    type: UserType,
    resolve: userController.me,
  },
};

export default userQueries;
