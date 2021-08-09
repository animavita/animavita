import {fromGlobalId} from 'graphql-relay';

import {GraphQLContext} from '../../../../types';

const userController = {
  async index(_: any, args: any, context: GraphQLContext) {
    const {id} = fromGlobalId(args.id);

    const getUserProfile = context.container.getUserProfile;

    const user = await getUserProfile(id);

    return user;
  },

  async me(_: any, __: any, context: GraphQLContext) {
    const {user} = context;

    return user;
  },
};

export default userController;
