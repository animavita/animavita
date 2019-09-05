import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList
} from 'graphql';
import UserType from '../user/UserType';
import AddressType from '../address/AddressType';
import UserModel from '../user/UserModel';

const AdoptType = new GraphQLObjectType({
  name: 'Adopt',
  description: 'Adopt data',
  fields: () => ({
    _id: {
      type: GraphQLID,
      // eslint-disable-next-line no-underscore-dangle
      resolve: adopt => adopt._id
    },
    user: {
      type: UserType,
      resolve: async adopt => UserModel.findOne({
        _id: adopt.user
      })
    },
    name: {
      type: GraphQLString,
      resolve: adopt => adopt.name
    },
    breed: {
      type: GraphQLString,
      resolve: adopt => adopt.breed
    },
    type: {
      type: GraphQLString,
      resolve: adopt => adopt.type
    },
    size: {
      type: GraphQLString,
      resolve: adopt => adopt.size
    },
    gender: {
      type: GraphQLString,
      resolve: adopt => adopt.gender
    },
    images: {
      type: GraphQLList(GraphQLString),
      resolve: adopt => adopt.images
    },
    firstImage: {
      type: GraphQLString,
      resolve: adopt => adopt.images[0]
    },
    address: {
      type: AddressType,
      resolve: adopt => adopt.address
    }
  })
});

export default AdoptType;
