import mongoose from 'mongoose';

const { Schema, ObjectId } = mongoose;

const SolicitationSchema = new Schema(
  {
    adopt: {
      type: ObjectId,
      ref: 'Adopt'
    },
    user: {
      type: ObjectId,
      ref: 'User'
    },
    accepted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Solicitation', SolicitationSchema);
