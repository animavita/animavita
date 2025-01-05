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
    const { longitude, latitude } = pet.location.getValue();

    const doc: MongoPet = {
      name: pet.name,
      breed: pet.breed,
      age: pet.age.getValue(),
      gender: pet.gender.getValue(),
      size: pet.size.getValue(),
      photos: pet.photos,
      type: pet.type.getValue(),
      observations: pet.observations,
      user: pet.ownerId,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    };

    const newDocument = new this.petModel(doc);

    await newDocument.save();

    return {
      id: newDocument.id,
    };
  }
}
