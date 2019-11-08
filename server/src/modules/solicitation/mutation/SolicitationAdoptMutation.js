import { GraphQLString, GraphQLNonNull } from 'graphql';
import OneSignal from '~/services/onesignal';
import { mutationWithClientMutationId } from 'graphql-relay';
import pubSub, { EVENTS } from '../../../pubSub';
import AdoptModel from '../../adopt/AdoptModel';
import SolicitationModel from '../SolicitationModel';
import SolicitationType from '../SolicitationType';

export default mutationWithClientMutationId({
  name: 'SolicitationAdoptMutation',
  inputFields: {
    adoptId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ adoptId }, { user }) => {
    const adopt = await AdoptModel.findById(adoptId);

    if (adopt) {
      const solicitation = await SolicitationModel.create({
        adopt: adopt._id,
        user: user._id
      });

      OneSignal.notification(
        {
          contents: {
            en: `${user.name} enviou uma solicitação para adotar ${adopt.name}!`
          }
        },
        adopt.user
      );

      pubSub.publish(EVENTS.SOLICITATION.SENDED, {
        SolicitationSended: solicitation
      });

      return { solicitation };
    }

    throw new Error('Error on send solicitation to adopt');
  },
  outputFields: {
    solicitation: {
      type: SolicitationType,
      resolve: ({ solicitation }) => solicitation
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
