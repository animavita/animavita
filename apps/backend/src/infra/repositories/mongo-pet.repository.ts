import { Injectable } from '@nestjs/common';
import { Pet } from '../../domain/pet/pet';
import PetRepository from '../../application/repositories/pet.repository';
import { MongoPet, PetDocument } from '../mongo/schemas/pet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class MongoPetRepository implements PetRepository {
  constructor(
    @InjectModel(MongoPet.name)
    private readonly petModel: Model<PetDocument>,
  ) {}

  async getById(_id: string): Promise<Pet> {
    if (!isValidObjectId(_id)) return null;

    const document = await this.petModel.findOne({ _id });

    if (!document) return null;

    return Pet.create({
      id: document.id,
      name: document.name,
      breed: document.breed,
      age: document.age,
      gender: document.gender,
      size: document.size,
      photos: document.photos,
      type: document.type,
      observations: document.observations,
      ownerId: document.user,
      location: {
        longitude: document.location.coordinates[0],
        latitude: document.location.coordinates[1],
      },
    });
  }

  async store(pet: Pet) {
    const { longitude, latitude } = pet.location.getValue();

    const doc: MongoPet = {
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      size: pet.size,
      photos: pet.photos,
      type: pet.type,
      observations: pet.observations,
      user: pet.ownerId,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    };

    const existingDoc = await this.petModel.findById(pet.id);

    let id: string;

    if (!existingDoc) {
      const newDocument = new this.petModel(doc);
      await newDocument.save();
      id = newDocument.id;
    } else {
      await this.petModel.findByIdAndUpdate(existingDoc.id, doc, {
        upsert: true,
      });
      id = existingDoc.id;
    }

    return {
      id,
    };
  }
}
