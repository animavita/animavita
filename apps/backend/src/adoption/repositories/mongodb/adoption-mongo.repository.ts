import { InjectModel } from '@nestjs/mongoose';
import {
  AdoptionRepository,
  FindNearestType,
  IAdoption,
} from '../adoption-repository.interface';
import { AdoptionDocument } from './adoption-mongo.interface';
import { Model } from 'mongoose';
import { AdoptionMap } from './adoption-mongo.map';

export const RADIUS_OF_EARTH = 63781; // km

export class AdoptionMongoDBRepository implements AdoptionRepository {
  constructor(
    @InjectModel('Adoption')
    private readonly adoptionModel: Model<AdoptionDocument>,
  ) {}

  async create(adoption: IAdoption) {
    const newAdoption = new this.adoptionModel(adoption);

    const document = await newAdoption
      .save()
      .then((adoption) => adoption.populate('user', 'id name'));

    return AdoptionMap.toType(document);
  }

  async update(adoption: Partial<IAdoption>) {
    const document = await this.adoptionModel
      .findOneAndUpdate({ _id: adoption.id }, { $set: adoption }, { new: true })
      .populate('user', 'id name');

    return AdoptionMap.toType(document);
  }

  async getById(_id: string) {
    const document = await this.adoptionModel.findOne({ _id }).exec();

    return AdoptionMap.toType(document);
  }

  async findAll() {
    const documents = await this.adoptionModel
      .find()
      .populate('user', 'id name');

    return documents.map(AdoptionMap.toType);
  }

  async findNearest({ coordinates, currentUser, radius }: FindNearestType) {
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
      .ne(currentUser.id)
      .populate('user', 'id name');

    return documents.map(AdoptionMap.toType);
  }

  async delete(_id: string) {
    const document = await this.adoptionModel.findOneAndDelete({ _id }).exec();

    return AdoptionMap.toType(document);
  }
}
