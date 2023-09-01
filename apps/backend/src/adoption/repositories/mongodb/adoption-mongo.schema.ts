import * as mongoose from 'mongoose';
import { AdoptionDocument } from './adoption-mongo.interface';
import { LocationSchema } from '../../../user/repositories/mongodb/user-mongo.schema';

export const AdoptionSchema = new mongoose.Schema<AdoptionDocument>(
  {
    name: String,
    gender: String,
    breed: String,
    type: String,
    age: String,
    size: String,
    observations: String,
    photos: [String],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    location: LocationSchema,
  },
  { timestamps: true, collection: 'adoptions' },
);
