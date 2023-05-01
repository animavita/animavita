import { UserType } from '@animavita/models';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user-repository.interface';
import { getCoordinatesFromUser } from '../user/user.helpers';
import { AdoptionRepository } from './repositories/adoption-repository.interface';
import { AdoptionDto } from './adoption.interface';

type UserEmail = UserType['email'];

@Injectable()
export class AdoptionsService {
  @Inject(UserService)
  private readonly userService: UserRepository;

  constructor(
    @Inject('MONGODB') private readonly adoptionRepository: AdoptionRepository,
  ) {}

  async createAdoption(adoption: AdoptionDto, currentUserEmail: UserEmail) {
    const currentUser = await this.userService.findByEmail(currentUserEmail);
    const coordinates = getCoordinatesFromUser(currentUser);

    const newAdoption = await this.adoptionRepository.create({
      ...adoption,
      location: {
        type: 'Point',
        coordinates,
      },
      user: currentUser.id,
    });

    return newAdoption;
  }

  async updateAdoption(adoption: AdoptionDto) {
    const target = await this.adoptionRepository.getById(adoption.id);

    if (!target) throw new NotFoundException();

    return await this.adoptionRepository.update(adoption);
  }

  async findAll() {
    return await this.adoptionRepository.findAll();
  }

  async findNearMe({
    currentUserEmail,
    radius = 1,
  }: {
    currentUserEmail: UserEmail;
    radius: number;
  }) {
    const currentUser = await this.userService.findByEmail(currentUserEmail);
    const coordinates = getCoordinatesFromUser(currentUser);

    return this.adoptionRepository.findNearest({
      currentUser,
      coordinates,
      radius,
    });
  }

  async deleteAdoption(adoptionId: string) {
    const target = await this.adoptionRepository.getById(adoptionId);

    if (!target) throw new NotFoundException();

    return await this.adoptionRepository.delete(adoptionId);
  }
}
