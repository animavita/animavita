import { PubSub } from 'graphql-yoga';

export const EVENTS = {
  MESSAGE: {
    SENDED: 'MESSAGE_SENDED'
  }
};

export default new PubSub();
