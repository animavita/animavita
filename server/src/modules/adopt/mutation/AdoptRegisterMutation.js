import {
  GraphQLString, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLList
} from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import { mutationWithClientMutationId } from 'graphql-relay';
import AdoptModel from '../AdoptModel';
import { uploadFile } from '~/utils/helpers';

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
    gender: {
      type: new GraphQLEnumType({
        name: 'Gender',
        description: 'Gender of animal (male or female)',
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
      type: new GraphQLNonNull(GraphQLList(GraphQLUpload))
    },
    observations: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async ({
    name, breed, type, gender, age, size, images
  }, { user }) => {
    const uploads = await Promise.all(images.map(uploadFile));
    try {
      const adopt = AdoptModel.create({
        user,
        name,
        breed,
        type,
        gender,
        age,
        size,
        images: uploads,
        address: user.address,
        location: user.location
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
