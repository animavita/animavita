import {GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInputObjectType} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import {petsController} from '../../controllers/petsController';
import {GenderType, PetType, SpecieType} from '../PetType';

const registerPetMutation = mutationWithClientMutationId({
  name: 'RegisterPetMutation',
  description: 'Register a new pet into the platform',
  inputFields: {
    name: {type: GraphQLNonNull(GraphQLString)},
    gender: {type: GraphQLNonNull(GenderType)},
    location: {
      type: GraphQLNonNull(
        new GraphQLInputObjectType({
          name: 'LocationInput',
          fields: {
            type: {type: GraphQLNonNull(GraphQLString)},
            coordinates: {type: GraphQLNonNull(GraphQLList(GraphQLFloat))},
          },
        }),
      ),
    },
    photos: {type: GraphQLList(GraphQLNonNull(GraphQLString))},
    specie: {type: GraphQLNonNull(SpecieType)},
    age: {type: GraphQLNonNull(GraphQLInt)},
    description: {type: GraphQLNonNull(GraphQLString)},
  },
  mutateAndGetPayload: petsController.create,
  outputFields: {
    pet: {
      type: PetType,
      resolve: obj => obj.pet,
    },
  },
});

export {registerPetMutation};
