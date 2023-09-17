import { Global, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
  AdoptionSchema,
  MongoAdoption,
} from '../../src/adoption/repositories/mongodb/adoption-mongo.schema';
import { DataServices } from '../../src/core/abstracts/data-services.abstract';
import { MongoDataServices } from '../../src/frameworks/data-services/mongo-data.services';
import {
  MongoUser,
  UserSchema,
} from '../../src/user/repositories/mongodb/user-mongo.schema';

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
      { name: MongoAdoption.name, schema: AdoptionSchema },
      { name: MongoUser.name, schema: UserSchema },
    ]),
    rootMongooseTestModule(),
  ],
  providers: [
    {
      provide: DataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [DataServices],
})
export class TestMongoDataServicesModule {}

export const closeInMongodConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};
