import { Inject, Injectable } from '@nestjs/common';
import AdoptionRequestRepository, {
  ADOPTION_REQUEST_REPOSITORY,
} from '../../../repositories/adoption-request.repository';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import { NotFoundError, UnauthorizedError } from '../../../../domain/errors';

export type CancelAdoptionRequestInput = {
  requestId: string;
};

/**
 * Cancelling is the Adopter's action alone. An Owner who could cancel would be
 * able to disguise a rejection as the Adopter walking away. See ADR-0001.
 */
@Injectable()
export default class CancelAdoptionRequest {
  constructor(
    @Inject(ADOPTION_REQUEST_REPOSITORY)
    private readonly adoptionRequestRepository: AdoptionRequestRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CancelAdoptionRequestInput, adopterId: string) {
    const adopter = await this.userRepository.getById(adopterId);

    if (!adopter) {
      throw new NotFoundError('User not found');
    }

    if (!adopter.role.isAdopter) {
      throw new UnauthorizedError(
        'User is not authorized to cancel adoption requests',
      );
    }

    const request = await this.adoptionRequestRepository.getById(
      input.requestId,
    );

    if (!request) {
      throw new NotFoundError('Adoption request not found');
    }

    if (request.adopterId !== adopter.id) {
      throw new UnauthorizedError(
        "You're not authorized to cancel this adoption request",
      );
    }

    request.cancel();

    await this.adoptionRequestRepository.store(request);
  }
}
