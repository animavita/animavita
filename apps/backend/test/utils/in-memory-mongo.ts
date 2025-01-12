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
import { MongoPet, PetSchema } from '../../src/infra/mongo/schemas/pet.schema';
import { MongoPetRepository } from '../../src/infra/repositories/mongo-pet.repository';
import { MongoPetDAO } from '../../src/infra/dao/mongo-pet.dao';
import { PET_REPOSITORY } from '../../src/application/repositories/pet.repository';
import { PET_DAO } from '../../src/application/dao/pet.dao';

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
      { name: MongoPet.name, schema: PetSchema },
    ]),
    rootMongooseTestModule(),
  ],
  providers: [
    {
      provide: DataServices,
      useClass: MongoDataServices,
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
    DataServices,
    PET_REPOSITORY,
    PET_DAO,
    MongooseModule.forFeature([{ name: MongoPet.name, schema: PetSchema }]),
  ],
})
export class TestMongoDataServicesModule {}

export const closeInMongodConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};
