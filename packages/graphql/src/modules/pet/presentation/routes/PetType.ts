import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectTypeConfig,
  GraphQLEnumType,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLFloat,
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import {registerType, NodeInterface} from '../../../../interfaces/NodeInterface';
import {GraphQLContext} from '../../../../types';
import {PetDocument} from '../../infra/mongoose/PetModel';

type ConfigType = GraphQLObjectTypeConfig<PetDocument, GraphQLContext>;

const GenderType = new GraphQLEnumType({
  name: 'Gender',
  values: {
    MALE: {value: 'male'},
    FEMALE: {value: 'female'},
  },
});

const SpecieType = new GraphQLEnumType({
  name: 'Specie',
  values: {
    DOG: {value: 'dog'},
    CAT: {value: 'cat'},
    OTHER: {value: 'other'},
  },
});

const SizeType = new GraphQLEnumType({
  name: 'Size',
  values: {
    SMALL: {value: 'small'},
    MEDIUM: {value: 'medium'},
    BIG: {value: 'big'},
  },
});

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    type: {type: new GraphQLNonNull(GraphQLString)},
    coordinates: {type: new GraphQLNonNull(new GraphQLList(GraphQLFloat))},
  },
});

const PetTypeConfig: ConfigType = {
  name: 'Pet',
  description: 'Animavita pet',
  fields: () => ({
    id: globalIdField('Pet', pet => pet.id),
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The animal name',
      resolve: pet => pet.name,
    },
    location: {
      type: GraphQLNonNull(LocationType),
      description: 'The animal location',
      resolve: pet => pet.location,
    },
    gender: {
      type: GraphQLNonNull(GenderType),
      description: 'The animal gender',
      resolve: pet => pet.gender,
    },
    specie: {
      type: GraphQLNonNull(SpecieType),
      description: 'The animal type',
      resolve: pet => pet.specie,
    },
    age: {
      type: GraphQLInt,
      description: 'The animal age',
      resolve: pet => pet.age,
    },
    size: {
      type: SizeType,
      description: 'The animal size',
      resolve: pet => pet.size,
    },
    photos: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
      description: 'The animal photos',
      resolve: pet => pet.photos,
    },
    description: {
      type: GraphQLString,
      description: 'A short description about the animal',
      resolve: pet => pet.description,
    },
  }),
  interfaces: () => [NodeInterface],
};

const PetType = new GraphQLObjectType(PetTypeConfig);
registerType(PetType);

export {PetType, GenderType, SpecieType, SizeType};
