import { GraphQLObjectType, GraphQLID } from 'graphql';
import UserType from '../user/UserType';
import UserModel from '../user/UserModel';
import AdoptModel from '../adopt/AdoptModel';
import AdoptType from '../adopt/AdoptType';

const SolicitationType = new GraphQLObjectType({
  name: 'Solicitation',
  description: 'Solicitation to adopt a pet type schema',
  fields: () => ({
    _id: {
      type: GraphQLID,
      resolve: solicitation => solicitation._id
    },
    adopt: {
      type: AdoptType,
      resolve: async solicitation => AdoptModel.findOne({
        _id: solicitation.adopt
      })
    },
    user: {
      type: UserType,
      resolve: async solicitation => UserModel.findOne({
        _id: solicitation.user
      })
    }
  })
});

export default SolicitationType;
