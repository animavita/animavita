import {GraphQLObjectType} from 'graphql';

import userMutations from '../../../modules/user/presentation/routes/mutations';
import petMutations from '../../../modules/pet/presentation/routes/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root of all mutations',
  fields: () => ({
    ...userMutations,
    ...petMutations,
  }),
});
