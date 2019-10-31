import mongoose from 'mongoose';
import AddressModel from '../address/AddressModel';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: false,
      select: false
    },
    avatar: {
      type: String,
      required: true
    },
    facebookId: {
      type: String,
      unique: true,
      required: true
    },
    notifications: {
      type: Boolean,
      default: false
    },
    hero: {
      type: Boolean,
      default: false
    },
    address: AddressModel,
    pushTokens: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserPushToken'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserSchema);
