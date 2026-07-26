import { Inject, Injectable } from '@nestjs/common';
import AdoptionRequestRepository, {
  ADOPTION_REQUEST_REPOSITORY,
} from '../../../repositories/adoption-request.repository';
import PetRepository, {
  PET_REPOSITORY,
} from '../../../repositories/pet.repository';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import { NotFoundError, UnauthorizedError } from '../../../../domain/errors';

export type DenyAdoptionRequestInput = {
  requestId: string;
};

@Injectable()
export default class DenyAdoptionRequest {
  constructor(
    @Inject(ADOPTION_REQUEST_REPOSITORY)
    private readonly adoptionRequestRepository: AdoptionRequestRepository,
    @Inject(PET_REPOSITORY)
    private readonly petRepository: PetRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: DenyAdoptionRequestInput, ownerId: string) {
    const owner = await this.userRepository.getById(ownerId);

    if (!owner) {
      throw new NotFoundError('User not found');
    }

    if (!owner.role.isOwner) {
      throw new UnauthorizedError(
        'User is not authorized to deny adoption requests',
      );
    }

    const request = await this.adoptionRequestRepository.getById(
      input.requestId,
    );

    if (!request) {
      throw new NotFoundError('Adoption request not found');
    }

    const pet = await this.petRepository.getById(request.petId);

    if (!pet) {
      throw new NotFoundError('Pet not found');
    }

    if (owner.id !== pet.ownerId) {
      throw new UnauthorizedError(
        "You're not authorized to deny requests for this pet",
      );
    }

    request.deny('rejected_by_owner');

    await this.adoptionRequestRepository.store(request);
  }
}
