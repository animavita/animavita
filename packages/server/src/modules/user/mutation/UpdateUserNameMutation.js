import mongoose from 'mongoose';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../UserModel';

import UserType from '../UserType';

const { ObjectId } = mongoose.Types;

export default mutationWithClientMutationId({
  name: 'UserUpdateName',
  description: 'Update name of authenticated user',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastname: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: ({ name, lastname }, context) => {
    const user = UserModel.findByIdAndUpdate(ObjectId(context.user._id), {
      name: `${name.trim()} ${lastname.trim()}`
    });

    if (user) {
      return {
        user
      };
    }

    throw new Error('User not found or not updated!');
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
