global.fetch = require('jest-fetch-mock');

// mock aws sqs
jest.mock('aws-sdk', () => {
  const SQSMocked = {
    sendMessage: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return {
    SQS: jest.fn(() => SQSMocked),
  };
});

// mock jwt
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(),
  };
});
