import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UserEntity } from '../user-repository.interface';
import { UserMap } from './user-mongo.map';
import { MongoUser, UserDocument } from './user-mongo.schema';
import { MongoGenericRepository } from '../../../frameworks/data-services/mongo-generic-repository';

@Injectable()
export class UserMongoDBRepository extends MongoGenericRepository<
  MongoUser,
  UserEntity
> {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel, [], UserMap);
  }

  async findByEmail(email: string) {
    const foundUser = await this.userModel.findOne({ email });
    return UserMap.toType(foundUser);
  }
}
