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
    user: {
      type: UserType,
      resolve: async message => UserModel.findOne({
        _id: message.author
      })
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
      resolve: message => message.text
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: message => new Date(message.createdAt).toISOString()
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: message => message.updatedAt
    }
  })
});

export default MessageType;
