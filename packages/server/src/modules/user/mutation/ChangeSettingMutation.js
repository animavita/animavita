import mongoose from 'mongoose';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../UserModel';

import UserType from '../UserType';

const { ObjectId } = mongoose.Types;

export default mutationWithClientMutationId({
  name: 'ChangeSettingMutation',
  description: 'Updates the value of the setting passed as a parameter to the authenticated user',
  inputFields: {
    option: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ option }, context) => {
    const user = await UserModel.findById(ObjectId(context.user._id));
    user[option] = !user[option];

    if (await user.save()) {
      return {
        user
      };
    }

    throw new Error(`Setting ${option} not updated!`);
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({ user }) => user
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
