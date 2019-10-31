import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserPushTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    },
    playerId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('UserPushToken', UserPushTokenSchema);
