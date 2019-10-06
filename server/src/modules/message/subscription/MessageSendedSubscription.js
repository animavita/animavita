import MessageType from '../MessageType';
import pubSub, { EVENTS } from '~/pubSub';

const MessageSendedSubscription = {
  type: MessageType,
  subscribe: () => pubSub.asyncIterator(EVENTS.MESSAGE.SENDED)
};

export default MessageSendedSubscription;
