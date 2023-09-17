import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CreateUserRequest,
  UserResponse,
  UpdateUserRequest,
} from '@animavita/types';
import { DataServices } from '../core/abstracts/data-services.abstract';

@Injectable()
export class UserService {
  constructor(private readonly dataServices: DataServices) {}

  async create(user: CreateUserRequest): Promise<UserResponse> {
    const foundUser = await this.dataServices.users.findByEmail(user.email);

    if (foundUser)
      throw new UnprocessableEntityException('Email already taken');

    return this.dataServices.users.create(user);
  }

  findById(userId: string): Promise<UserResponse> {
    return this.dataServices.users.findById(userId);
  }

  findByEmail(email: string): Promise<UserResponse> {
    return this.dataServices.users.findByEmail(email);
  }

  async update(id: string, user: UpdateUserRequest): Promise<UserResponse> {
    const foundUser = await this.dataServices.users.findById(id);

    if (!foundUser) throw new NotFoundException("User doesn't exist");

    return this.dataServices.users.update(id, user);
  }
}
