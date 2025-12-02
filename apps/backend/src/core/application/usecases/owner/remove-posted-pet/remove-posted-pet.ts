import { Inject, Injectable } from '@nestjs/common';
import PetRepository, {
  PET_REPOSITORY,
} from '../../../repositories/pet.repository';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import { UnauthorizedError } from '../../../../domain/errors/unauthorized.error';
import { NotFoundError } from '../../../../domain/errors/not-found.error';

type Input = {
  id: string;
};

@Injectable()
export default class RemovePostedPet {
  constructor(
    @Inject(PET_REPOSITORY) private readonly petRepository: PetRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute({ id: petId }: Input, ownerId: string) {
    const owner = await this.userRepository.getById(ownerId);
    const pet = await this.petRepository.getById(petId);

    if (!pet) {
      throw new NotFoundError('Pet not found');
    }

    if (owner.id !== pet.ownerId) {
      throw new UnauthorizedError("You're not authorized to remove this pet");
    }

    await this.petRepository.remove(pet.id);
  }
}
