import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UserEntity, UserRepository } from '../user-repository.interface';
import { UserMap } from './user-mongo.map';
import { UserDocument } from './user-mongo.schema';

@Injectable()
export class UserMongoDBRepository implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: UserEntity) {
    const createdUser = await this.userModel.create(UserMap.toSchema(user));
    return UserMap.toType(createdUser);
  }

  async findById(userId: string) {
    const foundUser = await this.userModel.findById(userId);
    return UserMap.toType(foundUser);
  }

  async findByEmail(email: string) {
    const foundUser = await this.userModel.findOne({ email });
    return UserMap.toType(foundUser);
  }

  async update(id: string, user: Partial<UserEntity>) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      {
        id,
      },
      UserMap.toSchema(user),
      {
        new: true,
      },
    );

    return UserMap.toType(updatedUser);
  }
}
