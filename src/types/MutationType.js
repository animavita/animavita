import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation';
import AdoptMutations from '../modules/adopt/mutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...AdoptMutations
  })
});
