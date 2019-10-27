import mongoose from 'mongoose';

const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Conversation', ConversationSchema);
