import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MongoPet,
  PetDocument,
} from '../../../../../infra/mongo/schemas/pet.schema';

type Output = {
  name: string;
  breed: string;
  age: string;
  type: string;
  gender: string;
  size: string;
  observations: string;
  photos: string[];
};

@Injectable()
export default class GetPet {
  constructor(
    @InjectModel(MongoPet.name)
    private readonly petModel: Model<PetDocument>,
  ) {}

  async execute(petId: string): Promise<Output> {
    const document = await this.petModel.findOne({ _id: petId });

    return {
      name: document.name,
      breed: document.breed,
      age: document.age,
      type: document.type,
      gender: document.gender,
      size: document.size,
      observations: document.observations,
      photos: document.photos,
    };
  }
}
