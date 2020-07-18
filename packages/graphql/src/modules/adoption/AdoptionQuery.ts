import {GraphQLFieldConfigMap, GraphQLList} from 'graphql';

import {GraphQLContext} from '../../types';

import AdoptionType from './AdoptionType';
import AdoptionModel from './AdoptionModel';

export const AdoptionsQueries: GraphQLFieldConfigMap<any, GraphQLContext, any> = {
  adoptions: {
    type: GraphQLList(AdoptionType),
    resolve: (obj, args, context) => {
      return AdoptionModel.find();
    },
  },
};
