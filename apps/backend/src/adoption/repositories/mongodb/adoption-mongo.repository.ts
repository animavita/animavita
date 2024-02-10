import { InjectModel } from '@nestjs/mongoose';
import {
  AdoptionEntity,
  AdoptionRepository,
  FindNearestType,
  PopulatedAdoptionEntity,
} from '../adoption-repository.interface';
import { Model } from 'mongoose';
import { AdoptionMap } from './adoption-mongo.map';
import {
  AdoptionDocument,
  MongoAdoption,
  PopulatedAdoptionDocument,
} from './adoption-mongo.schema';
import { MongoGenericRepository } from '../../../frameworks/data-services/mongo-generic.repository';

export const RADIUS_OF_EARTH = 63781; // km

export class AdoptionMongoDBRepository
  extends MongoGenericRepository<
    MongoAdoption,
    AdoptionEntity,
    PopulatedAdoptionEntity
  >
  implements AdoptionRepository
{
  constructor(
    @InjectModel(MongoAdoption.name)
    private readonly adoptionModel: Model<AdoptionDocument>,
  ) {
    super(adoptionModel, ['user'], AdoptionMap);
  }

  async findNearest({ coordinates, currentUserId, radius }: FindNearestType) {
    const finalRadius = radius * 10; // 1.2 = 12km

    const documents = await this.adoptionModel
      .find({
        location: {
          $geoWithin: {
            $centerSphere: [coordinates, finalRadius / RADIUS_OF_EARTH],
          },
        },
      })
      .where('user')
      .ne(currentUserId)
      .populate<PopulatedAdoptionDocument>('user', 'id name');

    return documents.map(AdoptionMap.toType);
  }

  async findByUser(currentUserId: string) {
    const documents = await this.adoptionModel.find({
      user: {
        $eq: currentUserId,
      },
    });

    return documents.map(AdoptionMap.toType);
  }
}
