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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoAdoption.name, schema: AdoptionSchema },
      { name: MongoUser.name, schema: UserSchema },
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
  ],
  exports: [DataServices],
})
export class MongoDataServicesModule {}
