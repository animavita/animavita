import {GraphQLObjectType} from 'graphql';

import userMutations from '../../../modules/user/presentation/routes/mutations';
import createAdoptionMutation from '../../../modules/adoption/AdoptionMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root of all mutations',
  fields: () => ({
    ...userMutations,
    ...createAdoptionMutation,
  }),
});
