/* eslint-disable max-len */
import { withFilter } from 'graphql-subscriptions';
import SolicitationType from '../SolicitationType';
import AdoptModel from '../../adopt/AdoptModel';
import pubSub, { EVENTS } from '~/pubSub';

const SolicitationSendedSubscription = {
  type: SolicitationType,
  subscribe: withFilter(
    () => pubSub.asyncIterator(EVENTS.SOLICITATION.SENDED),
    async (payload, args, { user }) => {
      const adopt = await AdoptModel.findById(payload.adopt);
      return adopt.user.toString() === user._id.toString();
    }
  )
};

export default SolicitationSendedSubscription;
