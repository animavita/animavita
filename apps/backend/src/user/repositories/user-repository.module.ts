import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserMongoDBRepository } from './mongodb/user-mongo.repository';
import { UserSchema } from './mongodb/user-mongo.schema';
import { UserRepository } from './user-repository.interface';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserMongoDBRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserEntitiesModule {}
