import mongoose from 'mongoose';
import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import MessageType from './MessageType';
import MessageModel from './MessageModel';

const { ObjectId } = mongoose.Types;

export default {
  messages: {
    type: GraphQLList(MessageType),
    description: 'Take messages from conversation',
    args: {
      conversationId: {
        type: GraphQLString
      },
      first: {
        name: 'first',
        type: GraphQLInt
      },
      skip: {
        name: 'skip',
        type: GraphQLInt
      }
    },
    resolve: (obj, { conversationId, first = null, skip = null }, { user }) => MessageModel.find({
      conversation: ObjectId(conversationId),
      user: {
        $ne: ObjectId(user._id)
      }
    })
      .skip(skip)
      .limit(first)
      .sort('-createdAt')
  }
};
