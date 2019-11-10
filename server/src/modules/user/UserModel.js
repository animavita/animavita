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
      default: true
    },
    hero: {
      type: Boolean,
      default: false
    },
    address: {
      type: AddressModel,
      default: null
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: null
      }
    },
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

UserSchema.index({ location: '2dsphere' });

export default mongoose.model('User', UserSchema);
