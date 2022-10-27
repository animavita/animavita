import { AdoptionType } from '@animavita/models';
import * as mongoose from 'mongoose';

export const AdoptionSchema = new mongoose.Schema<AdoptionType>(
  {
    name: String,
    gender: String,
    breed: String,
    type: String,
    age: Number,
    size: String,
    observations: String,
    photos: [String],
  },
  { timestamps: true, collection: 'adoptions' },
);
