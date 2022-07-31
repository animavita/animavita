import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';

import AdoptionType, {AnimalSize, AnimalTypeType, GenderType} from './AdoptionType';
import AdoptionResolvers from './AdoptionResolvers';

const createAdoptionInputType = new GraphQLInputObjectType({
  name: 'Animal',
  description: 'Animal description',
  fields: () => ({
    name: {type: GraphQLNonNull(GraphQLString)},
    breed: {type: GraphQLNonNull(GraphQLString)},
    type: {type: GraphQLNonNull(AnimalTypeType)},
    gender: {type: GraphQLNonNull(GenderType)},
    size: {type: GraphQLNonNull(AnimalSize)},
    age: {type: GraphQLNonNull(GraphQLInt)},
    photos: {type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString)))},
    observations: {type: GraphQLNonNull(GraphQLString)},
  }),
});

const createAdoptionMutation = mutationWithClientMutationId({
  name: 'CreateAdoption',
  description: 'Register an animal adoption by the user',
  inputFields: {
    animal: {
      type: GraphQLNonNull(createAdoptionInputType),
    },
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: obj => obj.error,
    },
    adoption: {
      type: AdoptionType,
      resolve: obj => obj.adoption,
    },
  },
  mutateAndGetPayload: AdoptionResolvers.createAdoption,
});

export default {
  createAdoptionMutation,
};
