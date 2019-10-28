import mongoose from 'mongoose';
import { GraphQLList, GraphQLInt } from 'graphql';
import ConversationType from './ConversationType';
import ConversationModel from './ConversationModel';

const { ObjectId } = mongoose.Types;

export default {
  conversations: {
    type: GraphQLList(ConversationType),
    description: 'Take conversations of authenticated user',
    args: {
      first: {
        name: 'first',
        type: GraphQLInt
      },
      skip: {
        name: 'skip',
        type: GraphQLInt
      }
    },
    resolve: (obj, { first = null, skip = null }, { user }) => ConversationModel.find({
      members: ObjectId(user._id)
    })
      .skip(skip)
      .limit(first)
  }
};
