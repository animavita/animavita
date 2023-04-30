import * as mongoose from 'mongoose';
import { IAdoption } from './repositories/mongodb/adoption.interface';

export const AdoptionSchema = new mongoose.Schema<IAdoption>(
  {
    name: String,
    gender: String,
    breed: String,
    type: String,
    age: Number,
    size: String,
    observations: String,
    photos: [String],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true, collection: 'adoptions' },
);
