import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../user-repository.interface';
import { UserMap } from './user-mongo.map';
import { MongoUser, UserDocument } from './user-mongo.schema';
import {
  MongoUserSession,
  UserSessionDocument,
} from '../../../infra/mongo/schemas/user-session.schema';

@Injectable()
export class UserMongoDBRepository {
  constructor(
    @InjectModel(MongoUser.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(MongoUserSession.name)
    private readonly session: Model<UserSessionDocument>,
  ) {}

  async findByEmail(email: string) {
    const foundUser = await this.userModel.findOne({ email });
    return UserMap.toType(foundUser);
  }

  async findAll(): Promise<UserEntity[]> {
    const documents = await this.userModel.find();

    return documents.map(UserMap.toType);
  }

  async findById(_id: string): Promise<UserEntity> {
    const document = await this.userModel.findOne({ _id });

    if (!document) return null;

    const user = UserMap.toType(document);
    const refreshToken =
      (await this.session.findOne({ user: document.id }))?.refreshToken ||
      user.refreshToken;

    return {
      ...user,
      refreshToken,
    };
  }

  async create(item: UserEntity): Promise<UserEntity> {
    const newDocument = new this.userModel(UserMap.toSchema(item));

    const document = await newDocument.save().then((doc) => doc);

    return UserMap.toType(document);
  }

  async update(_id: string, item: UserEntity): Promise<UserEntity> {
    const document = await this.userModel.findOneAndUpdate(
      { _id },
      { $set: item },
      { new: true },
    );

    return UserMap.toType(document);
  }

  async delete(_id: string): Promise<UserEntity> {
    const document = await this.userModel.findOneAndDelete({ _id }).exec();

    return UserMap.toType(document);
  }
}
