import { GraphQLString, GraphQLNonNull } from 'graphql';
import OneSignal from '~/services/onesignal';
import { mutationWithClientMutationId } from 'graphql-relay';
import MessageModel from '../MessageModel';
import ConversationModel from '../../conversation/ConversationModel';
import MessageType from '../MessageType';
import pubSub, { EVENTS } from '../../../pubSub';

export default mutationWithClientMutationId({
  name: 'SendMessageMutation',
  inputFields: {
    conversationId: {
      type: GraphQLString
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ conversationId, userId, content }, { user }) => {
    const conversation = conversationId
      ? await ConversationModel.findById(conversationId)
      : await ConversationModel.create({
        members: [userId, user._id]
      });

    if (conversation) {
      const message = await MessageModel.create({
        conversation: conversation._id,
        author: user._id,
        text: content
      });

      OneSignal.post('notifications', {
        contents: {
          en: 'Testing notification with interceptor'
        },
        included_segments: ['All']
      });

      pubSub.publish(EVENTS.MESSAGE.SENDED, {
        MessageSended: message
      });

      return { message };
    }

    throw new Error('Erro on send message');
  },
  outputFields: {
    message: {
      type: MessageType,
      resolve: ({ message }) => message
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
