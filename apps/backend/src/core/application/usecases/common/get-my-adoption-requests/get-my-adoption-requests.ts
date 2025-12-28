import { Inject, Injectable } from '@nestjs/common';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import { NotFoundError } from '../../../../domain/errors';
import {
  AdoptionRequestDao,
  ADOPTION_REQUEST_DAO,
} from '../../../dao/adoption-request.dao';
import { AdoptionRequestDto } from '../../../dto/adoption-request.dto';

@Injectable()
export default class GetMyAdoptionRequests {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(ADOPTION_REQUEST_DAO)
    private readonly adoptionRequestDao: AdoptionRequestDao,
  ) {}

  async execute(userId: string): Promise<AdoptionRequestDto[]> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.role.isAdopter) {
      return this.adoptionRequestDao.getByAdopter(userId);
    }

    if (user.role.isOwner) {
      return this.adoptionRequestDao.getByOwner(userId);
    }

    return [];
  }
}
