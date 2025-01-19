import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MongoUser,
  UserSchema,
} from '../../user/repositories/mongodb/user-mongo.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoPet, PetSchema } from '../../infra/mongo/schemas/pet.schema';
import { MongoPetRepository } from '../../infra/repositories/mongo-pet.repository';
import { PET_REPOSITORY } from '../../core/application/repositories/pet.repository';
import { PET_DAO } from '../../core/application/dao/pet.dao';
import { MongoPetDAO } from '../../infra/dao/mongo-pet.dao';
import { UserRepository } from '../../user/repositories/user-repository.interface';
import { UserMongoDBRepository } from '../../user/repositories/mongodb/user-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
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
      provide: UserRepository,
      useClass: UserMongoDBRepository,
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
  exports: [UserRepository, PET_REPOSITORY, PET_DAO],
})
export class MongoDataServicesModule {}
