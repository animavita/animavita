import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList
} from 'graphql';
import UserType from '../user/UserType';
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
    email: {
      type: GraphQLString,
      resolve: adopt => adopt.email
    },
    images: {
      type: GraphQLList(GraphQLString),
      resolve: adopt => adopt.images
    },
    firstImage: {
      type: GraphQLString,
      resolve: adopt => adopt.images[0]
    }
  })
});

export default AdoptType;
