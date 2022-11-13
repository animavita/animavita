import { UserType } from '@animavita/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  create(user: UserType) {
    return this.userModel.create(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findById(userId: string) {
    return this.userModel.findById(userId);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: string, user: Partial<UserType>) {
    return this.userModel.updateOne(
      {
        id,
      },
      user,
    );
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
