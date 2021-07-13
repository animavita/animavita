import {GraphQLObjectType} from 'graphql';

import userMutations from '../../../modules/user/presentation/routes/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root of all mutations',
  fields: () => ({
    ...userMutations,
  }),
});
