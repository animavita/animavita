import { Inject, Injectable } from '@nestjs/common';
import { AdoptionRequest } from '../../../../domain/adoption-request/adoption-request';
import AdoptionRequestRepository, {
  ADOPTION_REQUEST_REPOSITORY,
} from '../../../repositories/adoption-request.repository';
import PetRepository, {
  PET_REPOSITORY,
} from '../../../repositories/pet.repository';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} from '../../../../domain/errors';

export type RequestPetAdoptionInput = {
  petId: string;
};

@Injectable()
export default class RequestPetAdoption {
  constructor(
    @Inject(ADOPTION_REQUEST_REPOSITORY)
    private readonly adoptionRequestRepository: AdoptionRequestRepository,
    @Inject(PET_REPOSITORY)
    private readonly petRepository: PetRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: RequestPetAdoptionInput, adopterId: string) {
    const user = await this.userRepository.getById(adopterId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.role.isAdopter) {
      throw new UnauthorizedError(
        'User is not authorized to request pet adoption',
      );
    }

    const pet = await this.petRepository.getById(input.petId);

    if (!pet) {
      throw new NotFoundError('Pet not found');
    }

    // Check if user already requested this pet
    const existingRequest =
      await this.adoptionRequestRepository.getByPetAndAdopter(
        input.petId,
        adopterId,
      );

    if (existingRequest) {
      throw new ConflictError('You have already requested this pet');
    }

    const adoptionRequest = AdoptionRequest.create({
      petId: input.petId,
      adopterId,
    });

    const { id } = await this.adoptionRequestRepository.store(adoptionRequest);

    return { id };
  }
}
