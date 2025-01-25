import { PetDao } from '../../core/application/dao/pet.dao';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  MongoPet,
  PetDocument,
  PetDocumentWithUser,
} from '../mongo/schemas/pet.schema';
import { Pet } from '../../core/application/dto/pet.dto';

export const RADIUS_OF_EARTH = 63781; // km

@Injectable()
export class MongoPetDAO implements PetDao {
  constructor(
    @InjectModel(MongoPet.name)
    private readonly petModel: Model<PetDocument>,
  ) {}

  async findNearest({ coordinates, adopterId, radius }) {
    const finalRadius = radius * 10; // 1.2 = 12km

    const documents = await this.petModel
      .find({
        location: {
          $geoWithin: {
            $centerSphere: [coordinates, finalRadius / RADIUS_OF_EARTH],
          },
        },
      })
      .where('user')
      .ne(adopterId)
      .populate<PetDocumentWithUser>('user', 'id name');

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

  async getByOwner(ownerId): Promise<Pet[]> {
    const documents = await this.petModel.find({
      user: {
        $eq: ownerId,
      },
    });

    return documents.map((document) => ({
      id: document._id.toString(),
      name: document.name,
      age: document.age,
      breed: document.breed,
      gender: document.gender,
      observations: document.observations,
      photos: document.photos,
      size: document.size,
      type: document.type,
    }));
  }
}
