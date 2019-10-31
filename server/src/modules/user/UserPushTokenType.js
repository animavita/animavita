import { GraphQLObjectType, GraphQLString } from 'graphql';
import UserType from './UserType';
import UserModel from './UserModel';

const UserPushTokenType = new GraphQLObjectType({
  name: 'UserPushToken',
  description: 'User token for push notifications',
  fields: () => ({
    _id: {
      type: UserType,
      resolve: push => UserModel.findById(push.user)
    },
    token: {
      type: GraphQLString,
      resolve: push => push.token
    },
    playerId: {
      type: GraphQLString,
      resolve: push => push.playerId
    }
  })
});

export default UserPushTokenType;
