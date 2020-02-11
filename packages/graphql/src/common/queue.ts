import AWS from 'aws-sdk';

import {AWS_STANDARD_QUEUE_URL} from './config';

import './aws';

const sqs = new AWS.SQS();

export default sqs;

interface Job {
  jobName: string;
  data: {
    [key: string]: string;
  };
}
export async function queueStandardJob(job: Job) {
  const transformToMessageAttributes = (messageAttributes: {}, key: string) => {
    const StringValue = typeof job.data[key] === 'string' ? job.data[key] : job.data[key].toString();

    return {
      ...messageAttributes,
      [key]: {
        DataType: 'String',
        StringValue,
      },
    };
  };

  const MessageAttributes = Object.keys(job.data).reduce<{}>(transformToMessageAttributes, {});

  await sqs
    .sendMessage({
      QueueUrl: AWS_STANDARD_QUEUE_URL,
      MessageBody: job.jobName,
      MessageAttributes,
    })
    .promise();
}
