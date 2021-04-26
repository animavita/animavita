import {GraphQLFieldConfigMap, GraphQLList} from 'graphql';
import {connectionDefinitions, forwardConnectionArgs, connectionFromPromisedArray} from 'graphql-relay';

import {GraphQLContext} from '../../types';

import AdoptModel from './AdoptionModel';
import AdoptionType from './AdoptionType';

export const AdoptionConnection = connectionDefinitions({
  name: 'Adoption',
  nodeType: AdoptionType,
});

export const AdoptionsQueries: GraphQLFieldConfigMap<any, GraphQLContext, any> = {
  adoptions: {
    type: AdoptionConnection.connectionType,
    args: forwardConnectionArgs,
    resolve: (_, args) => connectionFromPromisedArray(AdoptModel.find().populate('user') as any, args),
  },
  myAdoptions: {
    type: GraphQLList(AdoptionType),
    resolve: (_, args, context) => {
      return AdoptModel.where('user')
        .equals(context.user?._id)
        .populate('user');
    },
  },
};
