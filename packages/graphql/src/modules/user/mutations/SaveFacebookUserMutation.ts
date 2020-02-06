import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';

import {GraphQLContext} from '../../../types';
import UserModel, {IUser, IUserDocument} from '../UserModel';
import UserType from '../UserType';

interface SaveFacebookUserMutationArgs {
  token: string;
  expires: number;
  permissions: string[];
}
interface UserIncomplete {
  id: string;
  name: string;
  email: string;
}

export default mutationWithClientMutationId({
  name: 'SaveFacebookUser',
  description: 'Save facebook user data',
  inputFields: {
    token: {type: GraphQLNonNull(GraphQLString)},
    expires: {type: GraphQLNonNull(GraphQLInt)},
    permissions: {type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString)))},
  },
  mutateAndGetPayload: async (args: SaveFacebookUserMutationArgs, ctx: GraphQLContext) => {
    const {token} = args;

    const userIncomplete: UserIncomplete = await (
      await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`)
    ).json();

    if (!userIncomplete || !userIncomplete.email) return {error: 'Failed to fetch basic user data'};

    // TODO: upload this to S3 and save reference of this to user model, also verify if this was updated
    const {url: profileUrl} = await fetch(
      `https://graph.facebook.com/${userIncomplete.id}/picture?height=720&width=720`,
    );
    // eslint-disable-next-line no-console
    console.log(profileUrl);

    const {id, name, email} = userIncomplete;

    const newUserDocument: IUser = {
      ids: [{id, providedBy: 'facebook'}],
      name,
      emails: [{email, providedBy: 'facebook'}],
    };

    const checkIfUserAlreadyExistsPipeline = [
      {
        $match: {
          $or: [{ids: {$in: newUserDocument.ids}}, {emails: {$in: newUserDocument.emails}}],
        },
      },
    ];

    const userAggregation = await UserModel.aggregate(checkIfUserAlreadyExistsPipeline);

    // if the user provider already exists
    if (userAggregation.length && userAggregation.length === 1) {
      let dbUser: IUserDocument = userAggregation[0];

      // verify if name was updated
      if (name.length > dbUser.name.length) {
        await UserModel.updateOne({_id: dbUser._id}, {$set: {name}});
        dbUser = await UserModel.findById(dbUser._id).lean()!;
      }

      return {
        user: {
          ...dbUser,
          providerIds: dbUser.ids,
        },
      };
    } else {
      // @ts-ignore
      const user = (await new UserModel(newUserDocument).save())._doc;

      return {
        user: {
          ...user,
          providerIds: user.ids,
        },
      };
    }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error,
    },
    user: {
      type: UserType,
      resolve: obj => obj.user,
    },
  },
});
