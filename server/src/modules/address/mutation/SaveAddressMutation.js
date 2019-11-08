import mongoose from 'mongoose';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../../user/UserModel';
import UserType from '../../user/UserType';

const { ObjectId } = mongoose.Types;

export default mutationWithClientMutationId({
  name: 'SaveAddressMutation',
  description: 'Save in user your address',
  inputFields: {
    state: {
      type: new GraphQLNonNull(GraphQLString)
    },
    city: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ city, state }, context) => {
    const user = await UserModel.findById(ObjectId(context.user._id));
    user.address = {
      state,
      city
    };

    if (await user.save()) {
      return {
        user
      };
    }

    throw new Error('Error on save user address!');
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
