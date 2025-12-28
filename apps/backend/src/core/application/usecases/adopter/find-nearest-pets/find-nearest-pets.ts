import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../../../../user/user.service';
import { UserRepository } from '../../../../../user/repositories/user-repository.interface';
import { PET_DAO, PetDao } from '../../../dao/pet.dao';
import {
  ADOPTION_REQUEST_DAO,
  AdoptionRequestDao,
} from '../../../dao/adoption-request.dao';

type Input = {
  radius: number;
  adopterId: string;
};

@Injectable()
export default class FindNearestPets {
  constructor(
    @Inject(PET_DAO) private readonly petDAO: PetDao,
    @Inject(UserService) private readonly userService: UserRepository,
    @Inject(ADOPTION_REQUEST_DAO)
    private readonly adoptionRequestDao: AdoptionRequestDao,
  ) {}

  async execute(input: Input) {
    const adopter = await this.userService.findById(input.adopterId);

    const requestedPetIds = await this.adoptionRequestDao.getRequestedPetIds(
      input.adopterId,
    );

    const pets = await this.petDAO.findNearest({
      radius: input.radius,
      adopterId: adopter.id,
      coordinates: adopter.location,
      excludePetIds: requestedPetIds,
    });

    return pets;
  }
}
