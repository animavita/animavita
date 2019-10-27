import mongoose from 'mongoose';
import { GraphQLList } from 'graphql';
import ConversationType from './ConversationType';
import ConversationModel from './ConversationModel';

const { ObjectId } = mongoose.Types;

export default {
  conversations: {
    type: GraphQLList(ConversationType),
    description: 'Take conversations of authenticated user',
    resolve: (obj, args, { user }) => ConversationModel.find({
      members: ObjectId(user._id)
    })
  }
};
