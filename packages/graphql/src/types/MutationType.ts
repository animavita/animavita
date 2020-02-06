import {GraphQLObjectType} from 'graphql';

import UserMutations from '../modules/user/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
  }),
});
