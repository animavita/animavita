import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { generateToken, signInFacebook } from '~/utils/auth';
import UserModel from '../UserModel';

import UserType from '../UserType';

export default mutationWithClientMutationId({
  name: 'UserLoginWithFacebook',
  inputFields: {
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    },
    accessToken: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ accessToken }) => {
    const facebookUser = await signInFacebook(accessToken);

    if (facebookUser) {
      const avatar = facebookUser.picture.data.url;

      let user = await UserModel.findOne({ facebookId: facebookUser.id });

      if (!user) {
        user = await UserModel.create({
          facebookId: facebookUser.id,
          name: facebookUser.name,
          email: facebookUser.email,
          avatar
        });
      }

      if (user) {
        const token = await generateToken({ id: user.id });
        return { user, token };
      }
    }

    throw new Error('Facebook user not found');
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({ user }) => user
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
