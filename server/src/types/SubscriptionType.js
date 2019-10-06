import { GraphQLObjectType } from 'graphql';

import MessageSubscriptions from '../modules/message/subscription';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...MessageSubscriptions
  }
});
