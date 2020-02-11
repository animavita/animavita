import 'core-js/stable';

import connectDatabase from './common/database';

import userJobs from './modules/user/jobs';

interface MessageAttribute {
  [key: string]: {
    dataType: 'String' | 'Binary';
    stringValue?: string;
    binaryValue?: Buffer;
    stringListValues: string[];
    binaryListValues: Buffer[];
  };
}

interface Record {
  messageId: string;
  body: string;
  messageAttributes?: MessageAttribute;
}

const jobs = {
  ...userJobs,
};

export const handler = (event, ctx) => {
  connectDatabase()
    .then(() => {
      for (const record of event['Records'] as Record[]) {
        const {body: jobName, messageAttributes} = record;

        if (!Object.keys(jobs).includes(jobName)) {
          // eslint-disable-next-line no-console
          console.log('Invalid job');
          return;
        }

        // eslint-disable-next-line no-console
        console.log(`[START:JOB]: ${jobName}`);

        const job = jobs[jobName];

        const transformToSimpleObjectValue = (prev: {}, curr: string) => {
          return messageAttributes && messageAttributes[curr].dataType === 'String'
            ? {[curr]: messageAttributes[curr].stringValue}
            : prev;
        };

        const attributes = Object.keys(record.messageAttributes || {}).reduce<{}>(transformToSimpleObjectValue, {});

        // @ts-ignore
        job(attributes).then(() => {
          // eslint-disable-next-line no-console
          console.log(`[FINISH:JOB]: ${jobName}`);
        });
      }
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
};
