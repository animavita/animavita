import {GraphQLObjectType} from 'graphql';

import UserMutations from '../modules/user/mutations';
import AdoptionMutations from '../modules/adoption/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...AdoptionMutations,
  }),
});
