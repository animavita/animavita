import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataServices } from '../../core/abstracts/data-services.abstract';
import { UserMongoDBRepository } from '../../user/repositories/mongodb/user-mongo.repository';
import {
  MongoUser,
  UserDocument,
} from '../../user/repositories/mongodb/user-mongo.schema';

@Injectable()
export class MongoDataServices implements DataServices, OnApplicationBootstrap {
  users: UserMongoDBRepository;

  constructor(
    @InjectModel(MongoUser.name)
    private userRepository: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new UserMongoDBRepository(this.userRepository);
  }
}
