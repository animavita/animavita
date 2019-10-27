import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull
} from 'graphql';

import UserType from '../user/UserType';
import UserModel from '../user/UserModel';

const MessageType = new GraphQLObjectType({
  name: 'Message',
  description: 'Message data of a conversation',
  fields: () => ({
    _id: {
      type: GraphQLID,
      resolve: message => message._id
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
