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
import { USER_REPOSITORY } from '../../core/application/repositories/user.repository';
import { MongoUserRepository } from '../../infra/repositories/mongo-user.repository';
import { USER_SESSION_REPOSITORY } from '../../core/application/repositories/user-session.repository';
import { MongoUserSessionRepository } from '../../infra/repositories/mongo-user-session.repository';
import {
  MongoUser as MongoUserV2,
  UserSchema as UserSchemaV2,
} from '../../infra/mongo/schemas/user.schema';
import {
  MongoUserSession,
  UserSessionSchema,
} from '../../infra/mongo/schemas/user-session.schema';
import { PASSWORD_HASHER } from '../../core/domain/services/hasher.service';
import { Argon2Hasher } from '../../auth/argon2-password-hasher';
import {
  MongoAdoptionRequest,
  AdoptionRequestSchema,
} from '../../infra/mongo/schemas/adoption-request.schema';
import { ADOPTION_REQUEST_REPOSITORY } from '../../core/application/repositories/adoption-request.repository';
import { MongoAdoptionRequestRepository } from '../../infra/repositories/mongo-adoption-request.repository';
import { ADOPTION_REQUEST_DAO } from '../../core/application/dao/adoption-request.dao';
import { MongoAdoptionRequestDAO } from '../../infra/dao/mongo-adoption-request.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: UserSchema },
      { name: MongoPet.name, schema: PetSchema },
      { name: MongoUserV2.name, schema: UserSchemaV2 },
      { name: MongoUserSession.name, schema: UserSessionSchema },
      { name: MongoAdoptionRequest.name, schema: AdoptionRequestSchema },
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
      provide: PASSWORD_HASHER,
      useClass: Argon2Hasher,
    },
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
    {
      provide: ADOPTION_REQUEST_REPOSITORY,
      useClass: MongoAdoptionRequestRepository,
    },
    {
      provide: ADOPTION_REQUEST_DAO,
      useClass: MongoAdoptionRequestDAO,
    },
  ],
  exports: [
    UserRepository,
    PET_REPOSITORY,
    PET_DAO,
    USER_REPOSITORY,
    USER_SESSION_REPOSITORY,
    ADOPTION_REQUEST_REPOSITORY,
    ADOPTION_REQUEST_DAO,
  ],
})
export class MongoDataServicesModule {}
