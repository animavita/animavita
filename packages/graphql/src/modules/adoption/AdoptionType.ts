import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectTypeConfig,
  GraphQLEnumType,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import {registerType, NodeInterface} from '../../interfaces/NodeInterface';
import {GraphQLContext} from '../../types';
import UserType from '../user/UserType';

import {IAdoptionDocument} from './AdoptionModel';

type ConfigType = GraphQLObjectTypeConfig<IAdoptionDocument, GraphQLContext>;

export const GenderType = new GraphQLEnumType({
  name: 'Gender',
  values: {
    MALE: {value: 'male'},
    FEMALE: {value: 'female'},
  },
});

export const AnimalTypeType = new GraphQLEnumType({
  name: 'Type',
  values: {
    DOG: {value: 'dog'},
    CAT: {value: 'cat'},
    OTHER: {value: 'other'},
  },
});

export const AnimalSize = new GraphQLEnumType({
  name: 'Size',
  values: {
    SMALL: {value: 'small'},
    MEDIUM: {value: 'medium'},
    BIG: {value: 'big'},
  },
});

const AdoptionTypeConfig: ConfigType = {
  name: 'Adoption',
  description: 'Animavita adoption',
  fields: () => ({
    id: globalIdField('Adoption', adoption => adoption._id),
    user: {
      type: GraphQLNonNull(UserType),
      description: 'The adoption user reference',
      resolve: adoption => {
        return adoption.user;
      },
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The animal name',
      resolve: adoption => adoption.name,
    },
    gender: {
      type: GraphQLNonNull(GenderType),
      description: 'The animal gender',
      resolve: adoption => adoption.gender,
    },
    breed: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The animal breed',
      resolve: adoption => adoption.breed,
    },
    type: {
      type: GraphQLNonNull(AnimalTypeType),
      description: 'The animal type',
      resolve: adoption => adoption.type,
    },
    age: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'The animal age',
      resolve: adoption => adoption.age,
    },
    size: {
      type: GraphQLNonNull(AnimalSize),
      description: 'The animal size',
      resolve: adoption => adoption.size,
    },
    photos: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
      description: 'The animal photos',
      resolve: adoption => adoption.photos,
    },
    observations: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Any observation about the animal',
      resolve: adoption => adoption.observations,
    },
  }),
  interfaces: () => [NodeInterface],
};

const AdoptionType = new GraphQLObjectType(AdoptionTypeConfig);

export default registerType(AdoptionType);
