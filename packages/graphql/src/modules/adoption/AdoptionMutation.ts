import {mutationWithClientMutationId} from 'graphql-relay';
import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {AnimalSize, AnimalTypeType, GenderType} from './AdoptionType';
import AdoptionResolvers from './AdoptionResolvers';

const createAdoptionInputType = new GraphQLInputObjectType({
  name: 'AnimalInput',
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

const createAdoptionOutputType = new GraphQLObjectType({
  name: 'AdoptionCreationOutput',
  description: 'Adoption creation response',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    breed: {type: GraphQLString},
    type: {type: AnimalTypeType},
    gender: {type: GenderType},
    size: {type: AnimalSize},
    age: {type: GraphQLInt},
    photos: {type: GraphQLList(GraphQLString)},
    observations: {type: GraphQLString},
    user: {type: GraphQLString},
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
      type: createAdoptionOutputType,
      resolve: obj => obj,
    },
  },
  mutateAndGetPayload: AdoptionResolvers.createAdoption,
});

export default {
  createAdoptionMutation,
};
