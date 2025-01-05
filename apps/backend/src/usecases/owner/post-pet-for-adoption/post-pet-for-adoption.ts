import { Inject, Injectable } from '@nestjs/common';
import { Pet } from '../../../domain/pet/pet';
import PetRepository, {
  PET_REPOSITORY,
} from '../../../domain/pet/pet.repository';
import { UserService } from '../../../user/user.service';
import { UserRepository } from '../../../user/repositories/user-repository.interface';

type Input = {
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
export default class PostPetForAdoption {
  constructor(
    @Inject(PET_REPOSITORY) private readonly petRepository: PetRepository,
    @Inject(UserService) private readonly userService: UserRepository,
  ) {}

  async execute(input: Input, ownerEmail: string) {
    const owner = await this.userService.findByEmail(ownerEmail);

    const petAttributes = {
      ...input,
      ownerId: owner.id,
      location: owner.location,
    };

    const pet = Pet.create(petAttributes);

    const { id } = await this.petRepository.store(pet);

    return { id };
  }
}
