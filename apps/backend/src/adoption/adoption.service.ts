import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user-repository.interface';
import { AdoptionRepository } from './repositories/adoption-repository.interface';

import {
  AdoptionResponse,
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
  UserType,
} from '@animavita/types';

@Injectable()
export class AdoptionsService {
  @Inject(UserService)
  private readonly userService: UserRepository;

  constructor(private readonly adoptionRepository: AdoptionRepository) {}

  async createAdoption(
    adoption: CreateAdoptionRequest,
    currentUserEmail: UserType['email'],
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
    const target = await this.adoptionRepository.findById(adoption.id);

    if (!target) throw new NotFoundException();

    return await this.adoptionRepository.update(adoption.id, adoption);
  }

  async findAll() {
    return await this.adoptionRepository.findAll();
  }

  async findNearMe({
    currentUserEmail,
    radius = 1,
  }: {
    currentUserEmail: UserType['email'];
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
    const target = await this.adoptionRepository.findById(adoptionId);

    if (!target) throw new NotFoundException();

    return await this.adoptionRepository.delete(adoptionId);
  }
}
