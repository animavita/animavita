import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdoptionSchema,
  MongoAdoption,
} from '../../adoption/repositories/mongodb/adoption-mongo.schema';
import {
  MongoUser,
  UserSchema,
} from '../../user/repositories/mongodb/user-mongo.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoDataServices } from './mongo-data.services';
import { DataServices } from '../../core/abstracts/data-services.abstract';
import { MongoPet, PetSchema } from '../../infra/mongo/schemas/pet.schema';
import { MongoPetRepository } from '../../infra/repositories/mongo-pet.repository';
import { PET_REPOSITORY } from '../../domain/pet/pet.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoAdoption.name, schema: AdoptionSchema },
      { name: MongoUser.name, schema: UserSchema },
      { name: MongoPet.name, schema: PetSchema },
    ]),

    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
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
  ],
  exports: [DataServices, PET_REPOSITORY],
})
export class MongoDataServicesModule {}
