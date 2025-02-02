import { Global, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
  MongoUser,
  UserSchema,
} from '../../src/user/repositories/mongodb/user-mongo.schema';
import { MongoPet, PetSchema } from '../../src/infra/mongo/schemas/pet.schema';
import { MongoPetRepository } from '../../src/infra/repositories/mongo-pet.repository';
import { MongoPetDAO } from '../../src/infra/dao/mongo-pet.dao';
import { PET_REPOSITORY } from '../../src/core/application/repositories/pet.repository';
import { PET_DAO } from '../../src/core/application/dao/pet.dao';
import { UserRepository } from '../../src/user/repositories/user-repository.interface';
import { UserMongoDBRepository } from '../../src/user/repositories/mongodb/user-mongo.repository';
import { USER_REPOSITORY } from '../../src/core/application/repositories/user.repository';
import { USER_SESSION_REPOSITORY } from '../../src/core/application/repositories/user-session.repository';
import { MongoUserRepository } from '../../src/infra/repositories/mongo-user.repository';
import { MongoUserSessionRepository } from '../../src/infra/repositories/mongo-user-session.repository';
import {
  MongoUser as MongoUserV2,
  UserSchema as UserSchemaV2,
} from '../../src/infra/mongo/schemas/user.schema';
import {
  UserSessionSchema,
  MongoUserSession,
} from '../../src/infra/mongo/schemas/user-session.schema';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: UserSchema },
      { name: MongoPet.name, schema: PetSchema },
      { name: MongoUserV2.name, schema: UserSchemaV2 },
      { name: MongoUserSession.name, schema: UserSessionSchema },
    ]),
    rootMongooseTestModule(),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserMongoDBRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: MongoUserRepository,
    },
    {
      provide: USER_SESSION_REPOSITORY,
      useClass: MongoUserSessionRepository,
    },
    {
      provide: PET_REPOSITORY,
      useClass: MongoPetRepository,
    },
    {
      provide: PET_DAO,
      useClass: MongoPetDAO,
    },
  ],
  exports: [
    UserRepository,
    PET_REPOSITORY,
    PET_DAO,
    USER_REPOSITORY,
    USER_SESSION_REPOSITORY,
    MongooseModule.forFeature([{ name: MongoPet.name, schema: PetSchema }]),
  ],
})
export class TestMongoDataServicesModule {}

export const closeInMongodConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};
