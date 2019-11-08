import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation';
import AdoptMutations from '../modules/adopt/mutation';
import MessageMutations from '../modules/message/mutation';
import SolicitationMutations from '../modules/solicitation/mutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...AdoptMutations,
    ...MessageMutations,
    ...SolicitationMutations
  })
});
