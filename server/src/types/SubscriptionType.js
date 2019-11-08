import { GraphQLObjectType } from 'graphql';

import MessageSubscriptions from '../modules/message/subscription';
import SolicitationSubscriptions from '../modules/solicitation/subscription';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...SolicitationSubscriptions,
    ...MessageSubscriptions
  }
});
