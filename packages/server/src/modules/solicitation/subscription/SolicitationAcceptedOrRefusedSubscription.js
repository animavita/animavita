/* eslint-disable max-len */
import { withFilter } from 'graphql-subscriptions';
import SolicitationType from '../SolicitationType';
import pubSub, { EVENTS } from '~/pubSub';

const SolicitationAcceptedOrRefusedSubscription = {
  type: SolicitationType,
  subscribe: withFilter(
    () => pubSub.asyncIterator(EVENTS.SOLICITATION.RESPONSE),
    async (payload, args, { user }) => payload.solicitation.user.toString() === user._id.toString()
  )
};

export default SolicitationAcceptedOrRefusedSubscription;
