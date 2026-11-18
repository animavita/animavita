import { Inject, Injectable } from '@nestjs/common';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import { NotFoundError } from '../../../../domain/errors';
import {
  AdoptionRequestDao,
  AdoptionRequestRecord,
  ADOPTION_REQUEST_DAO,
} from '../../../dao/adoption-request.dao';
import { isContactVisible } from '../../../../domain/adoption-request/contact-visibility/contact-visibility';
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

    const records = await this.findRecordsFor(user.role, userId);

    return records.map(toAdoptionRequestDto);
  }

  private findRecordsFor(
    role: { isAdopter: boolean; isOwner: boolean },
    userId: string,
  ): Promise<AdoptionRequestRecord[]> {
    if (role.isAdopter) {
      return this.adoptionRequestDao.getByAdopter(userId);
    }

    if (role.isOwner) {
      return this.adoptionRequestDao.getByOwner(userId);
    }

    return Promise.resolve([]);
  }
}

/**
 * The only way a stored request becomes a response. Both parties see the same
 * thing: both phone numbers when contact is visible, neither otherwise.
 */
const toAdoptionRequestDto = ({
  ownerPhoneNumber,
  adopterPhoneNumber,
  ...record
}: AdoptionRequestRecord): AdoptionRequestDto => {
  const visible = isContactVisible(record);

  return {
    ...record,
    pet: {
      ...record.pet,
      owner: {
        ...record.pet.owner,
        phoneNumber: visible ? ownerPhoneNumber : null,
      },
    },
    adopter: {
      ...record.adopter,
      phoneNumber: visible ? adopterPhoneNumber : null,
    },
  };
};
