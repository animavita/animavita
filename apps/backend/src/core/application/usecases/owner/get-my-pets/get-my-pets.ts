import { Inject, Injectable } from '@nestjs/common';
import { Pet } from '../../../dto/pet.dto';
import { PetDao } from '../../../dao/pet.dao';
import { PET_DAO } from '../../../dao/pet.dao';

type Output = Pet[];

@Injectable()
export default class GetMyPets {
  constructor(@Inject(PET_DAO) private readonly petDAO: PetDao) {}

  async execute(ownerEmail: string): Promise<Output> {
    const pets = await this.petDAO.getByOwner(ownerEmail);

    return pets.map((pet) => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      type: pet.type,
      gender: pet.gender,
      size: pet.size,
      observations: pet.observations,
      photos: pet.photos,
    }));
  }
}
