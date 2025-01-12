import { PetDao } from '../../application/dao/pet.dao';
import {
  AdoptionDocument,
  MongoAdoption,
  PopulatedAdoptionDocument,
} from '../../adoption/repositories/mongodb/adoption-mongo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

export const RADIUS_OF_EARTH = 63781; // km

@Injectable()
export class MongoPetDAO implements PetDao {
  constructor(
    @InjectModel(MongoAdoption.name)
    private readonly adoptionModel: Model<AdoptionDocument>,
  ) {}

  async findNearest({ coordinates, adopterId, radius }) {
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
      .ne(adopterId)
      .populate<PopulatedAdoptionDocument>('user', 'id name');

    return documents.map((document) => ({
      id: document._id.toString(),
      name: document.name,
      age: document.age,
      breed: document.breed,
      gender: document.gender,
      location: {
        longitude: document.location.coordinates[0],
        latitude: document.location.coordinates[1],
      },
      observations: document.observations,
      photos: document.photos,
      size: document.size,
      type: document.type,
      user: {
        id: document.user._id.toString(),
        name: document.user.name,
      },
      createdAt: document.createdAt.toString(),
      updatedAt: document.updatedAt.toString(),
    }));
  }
}
