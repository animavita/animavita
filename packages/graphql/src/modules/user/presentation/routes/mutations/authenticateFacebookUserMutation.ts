import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import '../../../../../shared/aws';
import facebookSessionController from '../../controllers/facebookSessionController';
import UserType from '../../UserType';

export default mutationWithClientMutationId({
  name: 'SaveFacebookUser',
  description: 'Save facebook user data',
  // TODO: capture expo token to send push notifications
  inputFields: {
    token: {type: GraphQLNonNull(GraphQLString)},
    expires: {type: GraphQLNonNull(GraphQLInt)},
    permissions: {type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString)))},
  },

  mutateAndGetPayload: facebookSessionController.create,
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
