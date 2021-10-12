import mongoose, {Document} from 'mongoose';

import Provider from '../../../domain/Provider';

type IUserSchema = {
  _id: mongoose.Types.ObjectId;
  providers: Provider.Type[];
};

type IUserDocument = IUserSchema & Document;

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

const UserSchema = new mongoose.Schema(
  {
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
export {IUserSchema, IUserDocument};
