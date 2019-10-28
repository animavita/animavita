import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull
} from 'graphql';

import UserType from '../user/UserType';
import UserModel from '../user/UserModel';

import ConversationModel from '../conversation/ConversationModel';
import ConversationType from '../conversation/ConversationType';

const MessageType = new GraphQLObjectType({
  name: 'Message',
  description: 'Message data of a conversation',
  fields: () => ({
    _id: {
      type: GraphQLID,
      resolve: message => message._id
    },
    conversation: {
      type: ConversationType,
      resolve: async message => ConversationModel.findOne({
        _id: message.conversation
      })
    },
    author: {
      type: UserType,
      resolve: async message => UserModel.findOne({
        _id: message.author
      })
    },
    content: {
      type: GraphQLNonNull(GraphQLString),
      resolve: message => message.content
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: message => message.createdAt
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: message => message.updatedAt
    }
  })
});

export default MessageType;
