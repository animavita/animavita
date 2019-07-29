import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    _id: {
      type: GraphQLID,
      // eslint-disable-next-line no-underscore-dangle
      resolve: user => user._id
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email
    },
    avatar: {
      type: GraphQLString,
      resolve: user => user.avatar
    },
    facebookId: {
      type: GraphQLString,
      resolve: user => user.facebookId
    }
  })
});

export default UserType;
