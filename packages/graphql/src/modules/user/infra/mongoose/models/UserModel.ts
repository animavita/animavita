import mongoose, {Document} from 'mongoose';

import User from '../../../domain/User';

export const providedByDefinition = {
  providedBy: {
    type: String,
    lowercase: true,
    required: true,
  },
};

const providerIdSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      description: 'ID of the user in the provider DB',
      index: true,
      required: true,
    },
    ...providedByDefinition,
  },
  {
    _id: false,
  },
);

const EmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      description: 'User email',
      trim: true,
      index: true,
      lowercase: true,
      required: true,
    },
    ...providedByDefinition,
  },
  {
    _id: false,
  },
);

const ProfileImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      description: 'The key of the image on S3 Bucket',
      required: true,
    },
    ...providedByDefinition,
  },
  {
    _id: false,
    timestamps: true,
  },
);

export type IUserDocument = User & Document;

const UserSchema = new mongoose.Schema(
  {
    providersIds: {
      type: [providerIdSchema],
      description: 'Ids of the user in the providers',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      description: 'User name',
      trim: true,
      index: true,
      required: true,
    },
    emails: {
      type: [EmailSchema],
      description: 'E-mails of this user',
      required: true,
      unique: true,
    },
    profileImages: {
      type: [ProfileImageSchema],
      description: 'Profile images of this user',
      unique: true,
    },
  },
  {
    collection: 'User',
    timestamps: true,
  },
);

UserSchema.index({name: 'text'});

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
