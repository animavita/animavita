import mongoose from 'mongoose';

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
    images: [
      {
        type: String,
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Adopt', AdoptSchema);
