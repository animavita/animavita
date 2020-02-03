import mongoose, {Document} from 'mongoose';

export interface IEmail {
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
    },
  },
  {
    _id: false,
  },
);

export interface IUser extends Document {
  name: string;
  emails: IEmail[];
}
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      description: 'User name',
      trim: true,
      index: true,
    },
    emails: {
      type: [EmailSchema],
      description: 'E-mails of this user',
    },
  },
  {
    collection: 'User',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

UserSchema.index({name: 'text'});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
