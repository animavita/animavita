import mongoose from 'mongoose';
import ConversationType from './ConversationType';
import ConversationModel from './ConversationModel';

const { ObjectId } = mongoose.Types;

export default {
  conversations: {
    type: ConversationType,
    description: 'Take conversations of authenticated user',
    resolve: (obj, args, { user }) => ConversationModel.find({
      'members._id': ObjectId(user._id)
    })
  }
};
