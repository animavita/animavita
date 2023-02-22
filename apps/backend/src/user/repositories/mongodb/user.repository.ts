import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UserRepository } from '../user-repository.interface';
import { UserMap } from '../user.map';
import { IUser, UserDocument } from './user.interface';

@Injectable()
export class UserMongoDBRepository implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: IUser) {
    const createdUser = await this.userModel.create(user);
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

  async update(id: string, user: Partial<IUser>) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      {
        id,
      },
      user,
      {
        new: true,
      },
    );
    return UserMap.toType(updatedUser);
  }
}
