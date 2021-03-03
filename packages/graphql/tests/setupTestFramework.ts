global.fetch = require('jest-fetch-mock');

// mock aws sqs
jest.mock('aws-sdk', () => {
  const SQSMocked = {
    sendMessage: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  const S3Mocked = {
    upload: jest.fn().mockReturnThis(),
    promise: jest.fn(() => ({
      Location: 'https://fakebucket.com',
      Key: 'fakeitem',
    })),
  };
  return {
    SQS: jest.fn(() => SQSMocked),
    S3: jest.fn(() => S3Mocked),
  };
});

// mock jwt
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(),
  };
});

// mock node-base64-image
jest.mock('node-base64-image', () => ({
  encode: jest.fn(() => 'base64image'),
}));
