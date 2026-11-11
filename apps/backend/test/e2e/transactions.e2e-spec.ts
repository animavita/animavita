import { Test } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import {
  TestMongoDataServicesModule,
  closeInMongodConnection,
} from '../utils/in-memory-mongo';

describe('MongoDB transactions', () => {
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
    }).compile();

    connection = moduleFixture.get<Connection>(getConnectionToken());
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  beforeEach(async () => {
    await connection.collection('tx_first').deleteMany({});
    await connection.collection('tx_second').deleteMany({});
  });

  const countBoth = async () => ({
    first: await connection.collection('tx_first').countDocuments(),
    second: await connection.collection('tx_second').countDocuments(),
  });

  it('keeps the writes to both collections when the transaction commits', async () => {
    const session = await connection.startSession();

    await session.withTransaction(async () => {
      await connection.collection('tx_first').insertOne({ a: 1 }, { session });
      await connection.collection('tx_second').insertOne({ b: 1 }, { session });
    });
    await session.endSession();

    expect(await countBoth()).toEqual({ first: 1, second: 1 });
  });

  it('keeps neither write when the transaction aborts', async () => {
    const session = await connection.startSession();

    session.startTransaction();
    await connection.collection('tx_first').insertOne({ a: 1 }, { session });
    await connection.collection('tx_second').insertOne({ b: 1 }, { session });
    await session.abortTransaction();
    await session.endSession();

    expect(await countBoth()).toEqual({ first: 0, second: 0 });
  });
});
