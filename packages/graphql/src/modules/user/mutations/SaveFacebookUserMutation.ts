import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import '../../../common/aws';
import container from '../../../common/container';
import UserType from '../UserType';

export interface SaveFacebookUserMutationArgs {
  token: string;
  expires: number;
  permissions: string[];
}

export default mutationWithClientMutationId({
  name: 'SaveFacebookUser',
  description: 'Save facebook user data',
  // TODO: capture expo token to send push notifications
  inputFields: {
    token: {type: GraphQLNonNull(GraphQLString)},
    expires: {type: GraphQLNonNull(GraphQLInt)},
    permissions: {type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString)))},
  },

  mutateAndGetPayload: async ({expires, permissions, token}: SaveFacebookUserMutationArgs) =>
    container.cradle.authenticateFacebookUser({
      expires,
      permissions,
      token,
    }),
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error,
    },
    user: {
      type: UserType,
      resolve: obj => obj.user,
    },
    token: {
      type: GraphQLString,
      resolve: obj => obj.token,
    },
  },
});
