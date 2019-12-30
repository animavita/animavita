import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList
} from 'graphql';

import UserType from '../user/UserType';
import UserModel from '../user/UserModel';
import MessageModel from '../message/MessageModel';
import MessageType from '../message/MessageType';

const ConversationType = new GraphQLObjectType({
  name: 'Conversation',
  description: 'Conversation data',
  fields: () => ({
    _id: {
      type: GraphQLID,
      resolve: conversation => conversation._id
    },
    members: {
      type: GraphQLList(UserType),
      resolve: (conversation, _, { user }) => conversation.members
        .filter(member => member.toString() !== user._id.toString())
        .map(member => UserModel.findById(member))
    },
    lastMessage: {
      type: MessageType,
      description: 'Get the last message sent in the conversation',
      resolve: conversation => MessageModel.findOne({ conversation: conversation._id }).sort('-createdAt')
    },
    createdAt: {
      type: GraphQLString,
      resolve: conversation => conversation.createdAt
    },
    updatedAt: {
      type: GraphQLString,
      resolve: conversation => conversation.updatedAt
    }
  })
});

export default ConversationType;
