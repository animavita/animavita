import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user-repository.interface';

import {
  AdoptionResponse,
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
  UserType,
} from '@animavita/types';
import { DataServices } from '../core/abstracts/data-services.abstract';

@Injectable()
export class AdoptionsService {
  @Inject(UserService)
  private readonly userService: UserRepository;

  constructor(private readonly dataServices: DataServices) {}

  async createAdoption(
    adoption: CreateAdoptionRequest,
    currentUserEmail: UserType['email'],
  ): Promise<AdoptionResponse> {
    const { id, location } = await this.userService.findByEmail(
      currentUserEmail,
    );

    const newAdoption = await this.dataServices.adoptions.create({
      ...adoption,
      location,
      user: id,
    });

    return newAdoption;
  }

  async updateAdoption(adoption: UpdateAdoptionRequest) {
    const target = await this.dataServices.adoptions.findById(adoption.id);

    if (!target) throw new NotFoundException();

    return await this.dataServices.adoptions.update(adoption.id, adoption);
  }

  async findAll() {
    return await this.dataServices.adoptions.findAll();
  }

  async deleteAdoption(adoptionId: string) {
    const target = await this.dataServices.adoptions.findById(adoptionId);

    if (!target) throw new NotFoundException();

    return await this.dataServices.adoptions.delete(adoptionId);
  }
}
