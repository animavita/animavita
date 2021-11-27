import mongoose, {Document} from 'mongoose';

import {pointSchema} from '../../../../shared/infra/mongoose/schemas';

export type IPetSchema = {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  photos: string[];
  location: {
    type: 'Point';
    coordinates: number[];
  };
  gender: 'male' | 'female';
  specie: 'cat' | 'dog' | 'others';
  age?: number;
  size?: 'small' | 'medium' | 'big';
};

export type PetDocument = IPetSchema & Document;

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      description: 'Animal name',
      trim: true,
      index: true,
      required: true,
    },
    gender: {
      type: String,
      description: 'Animal gender',
      required: true,
    },
    specie: {
      type: String,
      description: 'Animal specie',
      required: true,
    },
    age: {
      type: Number,
      description: 'Animal age',
    },
    size: {
      type: String,
      description: 'Animal description',
    },
    location: {
      type: pointSchema,
      required: true,
    },
    photos: [
      {
        type: String,
        description: 'Photos of animal (min: 1)',
        required: true,
      },
    ],
    description: {
      type: String,
      description: 'Any observation about the animal',
      maxlength: 200,
    },
  },
  {
    collection: 'Pet',
    timestamps: true,
  },
);

const PetModel = mongoose.model<PetDocument>('Pet', PetSchema);

export {PetModel};
