import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdoptionMongoDBRepository } from '../../adoption/repositories/mongodb/adoption-mongo.repository';
import {
  AdoptionDocument,
  MongoAdoption,
} from '../../adoption/repositories/mongodb/adoption-mongo.schema';
import { DataServices } from '../../core/abstracts/data-services.abstract';
import { UserMongoDBRepository } from '../../user/repositories/mongodb/user-mongo.repository';
import {
  MongoUser,
  UserDocument,
} from '../../user/repositories/mongodb/user-mongo.schema';

@Injectable()
export class MongoDataServices implements DataServices, OnApplicationBootstrap {
  adoptions: AdoptionMongoDBRepository;
  users: UserMongoDBRepository;

  constructor(
    @InjectModel(MongoAdoption.name)
    private adoptionRepository: Model<AdoptionDocument>,

    @InjectModel(MongoUser.name)
    private userRepository: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.adoptions = new AdoptionMongoDBRepository(this.adoptionRepository);
    this.users = new UserMongoDBRepository(this.userRepository);
  }
}
