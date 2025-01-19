import { Inject, Injectable } from '@nestjs/common';
import PetRepository, {
  PET_REPOSITORY,
} from '../../../repositories/pet.repository';
import { UserService } from '../../../../../user/user.service';
import { UserRepository } from '../../../../../user/repositories/user-repository.interface';
import { UnauthorizedError } from '../../../../domain/errors/unauthorized.error';
import { NotFoundError } from '../../../../domain/errors/not-found.error';
import type { Input as UpdatablePetData } from '../post-pet-for-adoption/post-pet-for-adoption';

type Input = Partial<UpdatablePetData> & {
  id: string;
};

@Injectable()
export default class UpdatePostedPet {
  constructor(
    @Inject(PET_REPOSITORY) private readonly petRepository: PetRepository,
    @Inject(UserService) private readonly userService: UserRepository,
  ) {}

  async execute({ id: petId, ...input }: Input, ownerEmail: string) {
    const owner = await this.userService.findByEmail(ownerEmail);
    const pet = await this.petRepository.getById(petId);

    if (!pet) {
      throw new NotFoundError('Pet not found');
    }

    if (owner.id !== pet.ownerId) {
      throw new UnauthorizedError("You're not authorized to update this pet");
    }

    pet.update(input);

    const { id } = await this.petRepository.store(pet);

    return { id };
  }
}
