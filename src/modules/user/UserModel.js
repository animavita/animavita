import mongoose from 'mongoose';

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
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserSchema);
