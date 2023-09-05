import { InjectModel } from '@nestjs/mongoose';
import {
  AdoptionEntity,
  AdoptionRepository,
  FindNearestType,
} from '../adoption-repository.interface';
import { Model } from 'mongoose';
import { AdoptionMap } from './adoption-mongo.map';
import {
  AdoptionDocument,
  PopulatedAdoptionDocument,
} from './adoption-mongo.schema';

export const RADIUS_OF_EARTH = 63781; // km

export class AdoptionMongoDBRepository implements AdoptionRepository {
  constructor(
    @InjectModel('Adoption')
    private readonly adoptionModel: Model<AdoptionDocument>,
  ) {}

  async create(adoption: AdoptionEntity) {
    const newAdoption = new this.adoptionModel(AdoptionMap.toSchema(adoption));

    const document = await newAdoption
      .save()
      .then((adoption) =>
        adoption.populate<PopulatedAdoptionDocument>('user', 'id name'),
      );

    return AdoptionMap.toType(document);
  }

  async update(adoption: Partial<AdoptionEntity>) {
    const document = await this.adoptionModel
      .findOneAndUpdate({ _id: adoption.id }, { $set: adoption }, { new: true })
      .populate<PopulatedAdoptionDocument>('user', 'id name');

    return AdoptionMap.toType(document);
  }

  async getById(_id: string) {
    const document = await this.adoptionModel
      .findOne({ _id })
      .populate<PopulatedAdoptionDocument>('user', 'id name')
      .exec();

    return AdoptionMap.toType(document);
  }

  async findAll() {
    const documents = await this.adoptionModel
      .find()
      .populate<PopulatedAdoptionDocument>('user', 'id name');

    return documents.map(AdoptionMap.toType);
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

  async delete(_id: string) {
    const document = await this.adoptionModel
      .findOneAndDelete({ _id })
      .populate<PopulatedAdoptionDocument>('user', 'id name')
      .exec();

    return AdoptionMap.toType(document);
  }
}
