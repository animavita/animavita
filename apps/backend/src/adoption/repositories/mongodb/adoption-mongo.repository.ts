import { InjectModel } from '@nestjs/mongoose';
import {
  AdoptionEntity,
  PopulatedAdoptionEntity,
} from '../adoption-repository.interface';
import { Model } from 'mongoose';
import { AdoptionMap } from './adoption-mongo.map';
import { AdoptionDocument, MongoAdoption } from './adoption-mongo.schema';
import { MongoGenericRepository } from '../../../frameworks/data-services/mongo-generic.repository';

export const RADIUS_OF_EARTH = 63781; // km

export class AdoptionMongoDBRepository extends MongoGenericRepository<
  MongoAdoption,
  AdoptionEntity,
  PopulatedAdoptionEntity
> {
  constructor(
    @InjectModel(MongoAdoption.name)
    private readonly adoptionModel: Model<AdoptionDocument>,
  ) {
    super(adoptionModel, ['user'], AdoptionMap);
  }
}
