import 'core-js/stable';

import connectDatabase from './common/database';

interface MessageAttribute {
  dataType: 'String' | 'Binary';
  stringValue?: string;
  binaryValue?: Buffer;
  stringListValues: string[];
  binaryListValues: Buffer[];
}

interface Record {
  messageId: string;
  body: string;
  messageAttributes?: {
    [key: string]: MessageAttribute;
  };
}

export const handler = (event, ctx) => {
  connectDatabase()
    .then(() => {
      for (const record of event['Records'] as Record[]) {
        console.log(record);
      }
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
};
