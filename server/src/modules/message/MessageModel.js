import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Message', MessageSchema);
