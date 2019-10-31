import mongoose from 'mongoose';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserPushTokenModel from '../UserPushTokenModel';
import UserPushTokenType from '../UserPushTokenType';

const { ObjectId } = mongoose.Types;

export default mutationWithClientMutationId({
  name: 'SaveUserPushTokenMutation',
  description: '',
  inputFields: {
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    playerId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ token, playerId }, { user }) => {
    let userToken = await UserPushTokenModel.findOne({
      user: ObjectId(user._id),
      token,
      playerId
    });

    if (!userToken) {
      userToken = await UserPushTokenModel.create({
        user: ObjectId(user._id),
        token,
        playerId
      });
    }

    return {
      userToken
    };
  },
  outputFields: {
    userToken: {
      type: UserPushTokenType,
      resolve: ({ userToken }) => userToken
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
