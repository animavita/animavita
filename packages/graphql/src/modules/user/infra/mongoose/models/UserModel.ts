import mongoose, {Document} from 'mongoose';

import User from '../../../domain/User';

const ProviderSchema = new mongoose.Schema({
  id: {
    type: String,
    description: 'Provider Id',
    require: true,
    index: true,
  },
  name: {
    type: String,
    description: 'User name on provider platform',
    require: true,
    index: true,
  },
  email: {
    type: String,
    description: 'User email',
    trim: true,
    index: true,
    lowercase: true,
    required: true,
  },
  profileImage: {
    type: String,
    description: 'The profile image URL',
  },
  origin: {
    type: String,
    description: 'Provider name',
    required: true,
  },
  lastLogIn: {
    type: Number,
    description: 'The last time the user logged in with that provider',
    required: true,
  },
});

export type IUserDocument = User.Type & Document;

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      description: 'user UUID',
      trim: true,
      index: true,
      required: true,
    },
    providers: {
      type: [ProviderSchema],
      description: "All the user's providers",
      required: true,
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
