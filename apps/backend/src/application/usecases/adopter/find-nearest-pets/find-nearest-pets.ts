import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../../../user/user.service';
import { UserRepository } from '../../../../user/repositories/user-repository.interface';
import { PET_DAO, PetDao } from '../../../dao/pet.dao';

type Input = {
  radius: number;
  adopterEmail: string;
};

@Injectable()
export default class FindNearestPets {
  constructor(
    @Inject(PET_DAO) private readonly petDAO: PetDao,
    @Inject(UserService) private readonly userService: UserRepository,
  ) {}

  async execute(input: Input) {
    const adopter = await this.userService.findByEmail(input.adopterEmail);

    const pets = await this.petDAO.findNearest({
      radius: input.radius,
      adopterId: adopter.id,
      coordinates: adopter.location,
    });

    return pets;
  }
}
