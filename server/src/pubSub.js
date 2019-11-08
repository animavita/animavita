import { PubSub } from 'graphql-yoga';

export const EVENTS = {
  MESSAGE: {
    SENDED: 'MESSAGE_SENDED'
  },
  SOLICITATION: {
    SENDED: 'SOLICITATION_SENDED',
    RESPONSE: 'ACCEPT_OR_REFUSE_SOLICITATION'
  }
};

export default new PubSub();
