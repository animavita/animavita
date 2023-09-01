import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserMongoDBRepository } from './mongodb/user-mongo.repository';
import { UserSchema } from './mongodb/user-mongo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    {
      provide: 'MONGODB',
      useClass: UserMongoDBRepository,
    },
  ],
  exports: ['MONGODB'],
})
export class UserEntitiesModule {}
