import {fromGlobalId} from 'graphql-relay';

import {GraphQLContext} from '../../../../types';
import {transformDomainUserIntoPresentationUser} from '../../utils';

const userController = {
  async index(_: any, args: any, context: GraphQLContext) {
    const {id} = fromGlobalId(args.id);

    const getUserProfile = context.container.getUserProfile;

    const user = await getUserProfile(id);

    const displayUser = user ? transformDomainUserIntoPresentationUser(user) : null;

    return displayUser;
  },

  async me(_: any, __: any, context: GraphQLContext) {
    const {user} = context;

    const displayUser = user ? transformDomainUserIntoPresentationUser(user) : null;

    return displayUser;
  },
};

export default userController;
