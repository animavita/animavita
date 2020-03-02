import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import imageToBase64 from 'image-to-base64';
import AWS from 'aws-sdk';

import '../../../common/aws';

import {AWS_S3_BUCKET_NAME} from '../../../common/config';
import {GraphQLContext} from '../../../types';
import UserModel, {IProfileImage, IUser, IUserDocument} from '../UserModel';
import UserType from '../UserType';
import {queueStandardJob} from '../../../common/queue';
import {USER_JOBS} from '../jobs';
import {generateToken} from '../../../token';

export interface SaveFacebookUserMutationArgs {
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
  // TODO: capture expo token to send push notifications
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

    const response = await fetch(`https://graph.facebook.com/${userIncomplete.id}/picture?height=720&width=720`);
    const {url: profileUrl} = response;

    const {id, name, email} = userIncomplete;

    const newUserDocument: IUser = {
      ids: [{id, providedBy: 'facebook'}],
      name,
      emails: [{email, providedBy: 'facebook'}],
    };

    const checkIfUserAlreadyExistsPipeline = [
      {
        $match: {
          $or: [
            {ids: {$in: newUserDocument.ids}},
            {emails: {$in: [...newUserDocument.emails, {email, providedBy: 'google'}, {email, providedBy: 'apple'}]}},
          ],
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

      // save id
      let shouldSaveId = false;
      for (const id of dbUser.ids) {
        if (id.id !== newUserDocument.ids[0].id && id.providedBy !== 'facebook') shouldSaveId = true;
      }
      if (shouldSaveId) {
        await UserModel.updateOne({_id: dbUser._id}, {$set: {ids: [...dbUser.ids, newUserDocument.ids[0]]}});
        dbUser = await UserModel.findById(dbUser._id).lean()!;
      }

      dbUser = await saveOrUpdateProfileImage(dbUser, profileUrl, userIncomplete);

      return {
        user: {
          ...dbUser,
          providerIds: dbUser.ids,
        },
        token: generateToken(dbUser),
      };
    } else {
      if (profileUrl) {
        const {Location, Key} = await uploadProfileImage(profileUrl, userIncomplete);

        newUserDocument.profileImages = [
          {
            key: Key,
            location: Location,
            originUri: profileUrl,
            providedBy: 'facebook',
          },
        ];
      }

      // @ts-ignore
      const user: IUserDocument = (await new UserModel(newUserDocument).save())._doc;

      await queueStandardJob({
        jobName: USER_JOBS.USER.EMAIL_WELCOME,
        data: {userId: user._id},
      });

      return {
        user: {
          ...user,
          providerIds: user.ids,
        },
        token: generateToken(user),
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
    token: {
      type: GraphQLString,
      resolve: obj => obj.token,
    },
  },
});

async function uploadProfileImage(url: string, user: UserIncomplete) {
  const base64Image = await imageToBase64(url);

  const buffer = Buffer.from(base64Image, 'base64');

  const s3 = new AWS.S3();

  const params = {
    Bucket: AWS_S3_BUCKET_NAME!,
    Key: `profile-pictures/${user.id}${new Date().getTime()}.jpeg`,
    Body: buffer,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };

  return await s3.upload(params).promise();
}

async function saveOrUpdateProfileImage(dbUser: IUserDocument, profileUrl: string, userIncomplete: UserIncomplete) {
  let shouldUpdateProfileImage = false;
  // if user doesn’t have profile image yet, upload it
  if (!dbUser.profileImages || dbUser.profileImages.length === 0) {
    shouldUpdateProfileImage = true;
  } else {
    // filter by facebook images
    const fbImages = dbUser.profileImages.filter(profileImage => profileImage.providedBy === 'facebook');

    // user might have profile image from another provider, use the image from last provider used
    if (!fbImages || fbImages.length === 0) {
      shouldUpdateProfileImage = true;
    } else {
      let alreadyExitsOnS3 = false;

      for await (const fbImage of fbImages) {
        const originBase64Image = await imageToBase64(fbImage.originUri);
        const fbBase64Image = await imageToBase64(fbImage.location);

        // verify if the current profile image already exists on S3
        if (fbBase64Image == originBase64Image) {
          alreadyExitsOnS3 = true;
        }
      }

      if (!alreadyExitsOnS3) {
        shouldUpdateProfileImage = true;
      }
    }
  }

  if (shouldUpdateProfileImage) {
    const {Location, Key} = await uploadProfileImage(profileUrl, userIncomplete);

    const fbProfileImage: IProfileImage = {
      key: Key,
      location: Location,
      originUri: profileUrl,
      providedBy: 'facebook',
    };

    const profileImages: IProfileImage[] = [];
    if (dbUser.profileImages) {
      profileImages.push(...dbUser.profileImages, fbProfileImage);
    } else {
      profileImages.push(fbProfileImage);
    }

    await UserModel.updateOne(
      {_id: dbUser._id},
      {
        $set: {profileImages},
      },
    );
    dbUser = await UserModel.findById(dbUser._id).lean()!;
  }
  return dbUser;
}
