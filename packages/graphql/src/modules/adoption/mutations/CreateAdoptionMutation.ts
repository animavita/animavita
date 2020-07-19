import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';

import AdoptionType, {AnimalSize, AnimalTypeType, GenderType} from '../AdoptionType';
import AdoptionModel, {Genders, Sizes, Types} from '../AdoptionModel';
import {GraphQLContext} from '../../../types';

export interface CreateAdoptionMutationArgs {
  name: string;
  gender: Genders;
  breed: string;
  type: Types;
  age: number;
  size: Sizes;
  photos: string[];
  observations: string;
}

export default mutationWithClientMutationId({
  name: 'CreateAdoption',
  description: 'Create a new adoption',
  inputFields: {
    name: {type: GraphQLNonNull(GraphQLString)},
    gender: {type: GraphQLNonNull(GenderType)},
    breed: {type: GraphQLNonNull(GraphQLString)},
    type: {type: GraphQLNonNull(AnimalTypeType)},
    age: {type: GraphQLNonNull(GraphQLInt)},
    size: {type: GraphQLNonNull(AnimalSize)},
    photos: {type: GraphQLNonNull(GraphQLList(GraphQLString))},
    observations: {type: GraphQLNonNull(GraphQLString)},
  },
  mutateAndGetPayload: async (args: CreateAdoptionMutationArgs, ctx: GraphQLContext) => {
    const {user} = ctx;

    if (!user) return {error: 'You need to be logged to create an adoption'};

    try {
      const adoption = await new AdoptionModel({...args, user}).save();
      return {
        adoption,
      };
    } catch (error) {
      return {
        error,
      };
    }
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
});
