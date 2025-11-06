import { Inject, Injectable } from '@nestjs/common';
import { Pet } from '../../../../domain/pet/pet';
import PetRepository, {
  PET_REPOSITORY,
} from '../../../repositories/pet.repository';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import { NotFoundError, UnauthorizedError } from '../../../../domain/errors';

export type PostPetForAdoptionInput = {
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
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(input: PostPetForAdoptionInput, ownerEmail: string) {
    const user = await this.userRepository.getByEmail(ownerEmail);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.role.isOwner) {
      throw new UnauthorizedError(
        'User is not authorized to post a pet for adoption',
      );
    }

    const owner = user;

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
