import mongoose from 'mongoose';
import AddressModel from '../address/AddressModel';

const { Schema, ObjectId } = mongoose;

const AdoptSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    observations: {
      type: String,
      required: false
    },
    breed: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female']
    },
    type: {
      type: String,
      required: true,
      enum: ['dog', 'cat']
    },
    size: {
      type: String,
      required: true,
      enum: ['small', 'medium', 'bigger']
    },
    age: {
      type: Number,
      required: false,
      default: 1
    },
    adopted: {
      type: Boolean,
      default: false
    },
    images: [
      {
        type: String,
        required: true
      }
    ],
    address: AddressModel
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Adopt', AdoptSchema);
