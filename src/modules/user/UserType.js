import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import AddressType from '../address/AddressType';

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
    },
    address: {
      type: AddressType,
      resolve: user => user.address
    }
  })
});

export default UserType;
