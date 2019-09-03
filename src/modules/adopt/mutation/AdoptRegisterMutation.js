import {
  GraphQLString, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLList
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import AdoptModel from '../AdoptModel';

import AdoptType from '../AdoptType';

export default mutationWithClientMutationId({
  name: 'AdoptRegister',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    breed: {
      type: new GraphQLNonNull(GraphQLString)
    },
    sex: {
      type: new GraphQLEnumType({
        name: 'Sex',
        description: 'Sex of animal (male or female)',
        values: {
          MALE: {
            value: 'male'
          },
          FEMALE: {
            value: 'female'
          }
        }
      })
    },
    type: {
      type: new GraphQLEnumType({
        name: 'Type',
        description: 'Type of animal (cat or dog)',
        values: {
          DOG: {
            value: 'dog'
          },
          CAT: {
            value: 'cat'
          }
        }
      })
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    size: {
      type: new GraphQLEnumType({
        name: 'Size',
        description: 'Size of animal register for adopt',
        values: {
          SMALL: {
            value: 'small'
          },
          MEDIUM: {
            value: 'medium'
          },
          BIGGER: {
            value: 'bigger'
          }
        }
      })
    },
    images: {
      type: new GraphQLNonNull(GraphQLList(GraphQLString))
    }
  },
  mutateAndGetPayload: async ({
    name, breed, type, age, size, images
  }, { user }) => {
    try {
      const adopt = AdoptModel.create({
        user,
        name,
        breed,
        type,
        age,
        size,
        images
      });

      return {
        adopt
      };
    } catch (error) {
      return {
        error
      };
    }
  },
  outputFields: {
    adopt: {
      type: AdoptType,
      resolve: ({ adopt }) => adopt
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
