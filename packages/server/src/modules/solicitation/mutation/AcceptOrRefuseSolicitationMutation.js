import { GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import OneSignal from '~/services/onesignal';
import { mutationWithClientMutationId } from 'graphql-relay';
import pubSub, { EVENTS } from '../../../pubSub';
import AdoptModel from '../../adopt/AdoptModel';
import SolicitationModel from '../SolicitationModel';
import SolicitationType from '../SolicitationType';

export default mutationWithClientMutationId({
  name: 'AcceptOrRefuseSolicitationMutation',
  inputFields: {
    solicitationId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    accepted: {
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  },
  mutateAndGetPayload: async ({ solicitationId, accepted }, { user }) => {
    const solicitation = await SolicitationModel.findById(solicitationId);
    const adopt = await AdoptModel.findById(solicitation.adopt);
    let content = '';

    if (!adopt.adopted) {
      if (accepted) {
        solicitation.accepted = accepted;
        adopt.adopted = accepted;

        await adopt.save();
        await solicitation.save();

        const schedule = new Date();
        schedule.setDate(schedule.getDate() + 14);

        OneSignal.notification(
          {
            contents: {
              en: `Olá ${user.name} ficamos muito felizes pela adoção de ${adopt.name}, gostariamos que você compartilha-se uma foto de vocês juntinhos para guardarmos no nosso álbum, o que acha ? Clique aqui para enviar :)`
            },
            send_after: schedule
          },
          solicitation.user
        );

        content = `Ficamos imensamente felizes de dizer que ${user.name} aceitou sua solicitação para adotar ${adopt.name}! Desejamos felicidades e obrigado por nos ajudar a mudar o mundo.`;
      } else {
        content = `${user.name} recusou sua solicitação para adotar ${adopt.name}!`;
        await solicitation.remove();
      }

      OneSignal.notification(
        {
          contents: {
            en: content
          }
        },
        solicitation.user
      );

      pubSub.publish(EVENTS.SOLICITATION.RESPONSE, {
        SolicitationAcceptedOrRefused: solicitation
      });

      return { solicitation, accepted };
    }

    throw new Error('Error on response the solicitation to adopt');
  },
  outputFields: {
    solicitation: {
      type: SolicitationType,
      resolve: ({ solicitation }) => solicitation
    },
    accepted: {
      type: GraphQLBoolean,
      resolve: ({ accepted }) => accepted
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
