import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt
} from 'graphql';
import UserType from '../user/UserType';
import AddressType from '../address/AddressType';
import UserModel from '../user/UserModel';
import { getAnimalGender, getAnimalSize } from '~/utils/helpers';

const AdoptType = new GraphQLObjectType({
  name: 'Adopt',
  description: 'All fields possible in adopt schema',
  fields: () => ({
    _id: {
      type: GraphQLID,
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
    age: {
      type: GraphQLInt,
      resolve: adopt => adopt.age
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
      resolve: adopt => getAnimalSize(adopt.size)
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
    },
    observations: {
      type: GraphQLString,
      resolve: adopt => adopt.observations
    }
  })
});

export default AdoptType;
