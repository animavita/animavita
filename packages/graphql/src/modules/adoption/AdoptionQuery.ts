import {GraphQLFieldConfigMap, GraphQLList} from 'graphql';
import {connectionDefinitions, forwardConnectionArgs} from 'graphql-relay';

import {GraphQLContext} from '../../types';

import AdoptionType from './AdoptionType';
import AdoptionResolvers from './AdoptionResolvers';

export const AdoptionConnection = connectionDefinitions({
  name: 'Adoption',
  nodeType: AdoptionType,
});

export const AdoptionsQueries: GraphQLFieldConfigMap<any, GraphQLContext, any> = {
  adoptions: {
    type: AdoptionConnection.connectionType,
    args: forwardConnectionArgs,
    resolve: AdoptionResolvers.adoption,
  },
  myAdoptions: {
    type: GraphQLList(AdoptionType),
    resolve: AdoptionResolvers.myAdoptions,
  },
};
