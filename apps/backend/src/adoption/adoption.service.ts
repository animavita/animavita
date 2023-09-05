import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user-repository.interface';
import { AdoptionRepository } from './repositories/adoption-repository.interface';

import {
  AdoptionResponse,
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
  UserDTO,
} from '@animavita/types';

@Injectable()
export class AdoptionsService {
  @Inject(UserService)
  private readonly userService: UserRepository;

  constructor(
    @Inject('MONGODB') private readonly adoptionRepository: AdoptionRepository,
  ) {}

  async createAdoption(
    adoption: CreateAdoptionRequest,
    currentUserEmail: UserDTO['email'],
  ): Promise<AdoptionResponse> {
    const { id, location } = await this.userService.findByEmail(
      currentUserEmail,
    );

    const newAdoption = await this.adoptionRepository.create({
      ...adoption,
      location,
      user: id,
    });

    return newAdoption;
  }

  async updateAdoption(adoption: UpdateAdoptionRequest) {
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
    currentUserEmail: UserDTO['email'];
    radius: number;
  }) {
    const { id: currentUserId, location: coordinates } =
      await this.userService.findByEmail(currentUserEmail);

    return this.adoptionRepository.findNearest({
      currentUserId,
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
