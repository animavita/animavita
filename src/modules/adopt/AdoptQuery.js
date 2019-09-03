import {
  GraphQLInt, GraphQLList, GraphQLString, GraphQLInputObjectType
} from 'graphql';
import {
  FILTER_CONDITION_TYPE,
  buildMongoConditionsFromFilters
} from '@entria/graphql-mongo-helpers';
import AdoptType from './AdoptType';
import AdoptModel from './AdoptModel';

const mapping = {
  size: {
    type: FILTER_CONDITION_TYPE.CUSTOM_CONDITION,
    format: (size) => {
      if (size !== '') {
        return { size };
      }
      return null;
    }
  },
  sex: {
    type: FILTER_CONDITION_TYPE.CUSTOM_CONDITION,
    format: (sex) => {
      if (sex !== '') {
        return { sex };
      }
      return null;
    }
  },
  type: {
    type: FILTER_CONDITION_TYPE.CUSTOM_CONDITION,
    format: (type) => {
      if (type !== '') {
        return { type };
      }

      return null;
    }
  },
  age: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  }
};

export default {
  adopts: {
    type: GraphQLList(AdoptType),
    description: 'Take all adoptions near authenticated user',
    args: {
      filter: {
        type: new GraphQLInputObjectType({
          name: 'AdoptsFilter',
          fields: () => ({
            size: {
              type: GraphQLString
            },
            sex: {
              type: GraphQLString
            },
            type: {
              type: GraphQLString
            },
            age_lte: {
              type: GraphQLInt
            }
          })
        })
      },
      first: {
        name: 'first',
        type: GraphQLInt
      },
      skip: {
        name: 'skip',
        type: GraphQLInt
      }
    },
    resolve: async (_, { filter, first = null, skip = null }, context) => {
      const { user } = context;
      const filterResult = buildMongoConditionsFromFilters(context, filter, mapping);
      const conditions = {
        ...filterResult.conditions,
        'address.city': user.address.city
      };

      return AdoptModel.find(conditions)
        .skip(skip)
        .limit(first);
    }
  }
};
