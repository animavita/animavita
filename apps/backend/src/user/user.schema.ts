import { UserType } from '@animavita/models';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema<UserType>(
  {
    name: String,
    email: String,
    password: String,
    location: {
      longitude: Number,
      latitude: Number,
    },
    photoUri: String,
    refreshToken: String,
  },
  { timestamps: true, collection: 'users' },
);
