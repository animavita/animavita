import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList
} from 'graphql';

import UserType from '../user/UserType';
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
      resolve: conversation => conversation.members
    },
    messages: {
      type: GraphQLList(MessageType),
      resolve: conversation => conversation.messages
    },
    lastMessage: {
      type: MessageType,
      description: 'Get the last message sent in the conversation',
      resolve: conversation => conversation.messages.pop()
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
