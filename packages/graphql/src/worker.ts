import AWS from 'aws-sdk';

import connectDatabase from './common/database';

import userJobs from './modules/user/jobs';
import {AWS_STANDARD_QUEUE_URL} from './common/config';

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
  receiptHandle: string;
  messageId: string;
  body: string;
  messageAttributes?: MessageAttribute;
}

const jobs = {
  ...userJobs,
};

export const handler = async (event, ctx) => {
  const sqs = new AWS.SQS();

  try {
    await connectDatabase();

    for (const record of event['Records'] as Record[]) {
      const {body: jobName, messageAttributes, receiptHandle} = record;

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
          ? {...prev, [curr]: messageAttributes[curr].stringValue}
          : prev;
      };

      const attributes = Object.keys(record.messageAttributes || {}).reduce<{}>(transformToSimpleObjectValue, {});

      try {
        // @ts-ignore
        await job(attributes);

        await sqs
          .deleteMessage({
            QueueUrl: AWS_STANDARD_QUEUE_URL,
            ReceiptHandle: receiptHandle,
          })
          .promise();

        // eslint-disable-next-line no-console
        console.log(`[FINISH:JOB]: ${jobName}`);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`[FAILED:JOB]: ${jobName}`);
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
