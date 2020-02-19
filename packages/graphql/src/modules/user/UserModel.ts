import mongoose, {Document} from 'mongoose';

export type Providers = 'facebook' | 'google' | 'apple';
export interface IProvider {
  providedBy: Providers;
}
export const providedByDefinition = {
  providedBy: {
    type: String,
    lowercase: true,
    required: true,
  },
};

export interface IId extends IProvider {
  id: string;
}
const IdSchema = new mongoose.Schema(
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

export interface IEmail extends IProvider {
  email: string;
}
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

export interface IProfileImage extends IProvider {
  key: string;
  location: string;
  originUri: string;
}
const ProfileImageSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      description: 'The key of the image on S3 Bucket',
      required: true,
    },
    location: {
      type: String,
      description: 'The location/url of the image on S3 Bucket',
      required: true,
    },
    originUri: {
      type: String,
      description: 'Original uri given by provider',
      required: true,
    },
    ...providedByDefinition,
  },
  {
    _id: false,
    timestamps: true,
  },
);

export interface IUser {
  ids: IId[];
  name: string;
  emails: IEmail[];
  profileImages?: IProfileImage[];
}
export type IUserDocument = IUser & Document;
const UserSchema = new mongoose.Schema(
  {
    ids: {
      type: [IdSchema],
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
