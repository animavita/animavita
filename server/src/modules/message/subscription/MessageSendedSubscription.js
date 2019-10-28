/* eslint-disable max-len */
import { withFilter } from 'graphql-subscriptions';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import MessageType from '../MessageType';
import pubSub, { EVENTS } from '~/pubSub';

const MessageSendedSubscription = {
  type: MessageType,
  args: {
    conversationId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  subscribe: withFilter(
    () => pubSub.asyncIterator(EVENTS.MESSAGE.SENDED),
    (payload, args) => payload.MessageSended.conversation.toString() === args.conversationId.toString()
  )
};

export default MessageSendedSubscription;
