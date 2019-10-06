import mongoose from 'mongoose';

const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Conversation', ConversationSchema);
