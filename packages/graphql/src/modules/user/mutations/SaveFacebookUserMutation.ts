import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import imageToBase64 from 'image-to-base64';
import AWS from 'aws-sdk';

import {AWS_ACCESS_KEY_ID, AWS_REGION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY} from '../../../common/config';
import {GraphQLContext} from '../../../types';
import UserModel, {IProfileImage, IUser, IUserDocument} from '../UserModel';
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

    const {url: profileUrl} = await fetch(
      `https://graph.facebook.com/${userIncomplete.id}/picture?height=720&width=720`,
    );

    const {id, name, email} = userIncomplete;

    let newUserDocument: IUser = {
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

      dbUser = await saveOrUpdateProfileImage(dbUser, profileUrl, userIncomplete);

      return {
        user: {
          ...dbUser,
          providerIds: dbUser.ids,
        },
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

async function uploadProfileImage(url: string, user: UserIncomplete) {
  const base64Image = await imageToBase64(url);

  AWS.config.update({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY, region: AWS_REGION});

  const buffer = Buffer.from(base64Image, 'base64');

  const s3 = new AWS.S3();

  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: `${user.id}${new Date().getTime()}.jpeg`,
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

    let profileImages: IProfileImage[] = [];
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
