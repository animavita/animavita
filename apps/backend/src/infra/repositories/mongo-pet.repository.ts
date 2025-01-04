import { Injectable } from '@nestjs/common';
import { Pet } from '../../domain/pet/pet';
import PetRepository from '../../domain/pet/pet.repository';
import { MongoPet, PetDocument } from '../mongo/schemas/pet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoPetRepository implements PetRepository {
  constructor(
    @InjectModel(MongoPet.name)
    private readonly petModel: Model<PetDocument>,
  ) {}

  async store(pet: Pet) {
    const doc: MongoPet = {
      name: pet.name,
      age: pet.age,
      breed: pet.breed,
      gender: pet.gender.getValue(),
      size: pet.size.getValue(),
      observations: pet.observations,
      photos: pet.photos,
      type: pet.type,
      user: pet.ownerId,
      location: {
        type: 'Point',
        coordinates: [pet.location.longitude, pet.location.latitude],
      },
    };

    const newDocument = new this.petModel(doc);

    await newDocument.save();
  }
}
