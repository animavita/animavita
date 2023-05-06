import * as mongoose from 'mongoose';
import { UserDocument } from './user.interface';

export const LocationSchema = {
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: true,
  },
};

export const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: LocationSchema,
    photoUri: String,
    refreshToken: String,
  },
  { timestamps: true, collection: 'users' },
);
