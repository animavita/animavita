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
import { UserRepository } from './repositories/user-repository.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserRequest): Promise<UserResponse> {
    const foundUser = await this.userRepository.findByEmail(user.email);

    if (foundUser)
      throw new UnprocessableEntityException('Email already taken');

    return this.userRepository.create(user);
  }

  findById(userId: string): Promise<UserResponse> {
    return this.userRepository.findById(userId);
  }

  findByEmail(email: string): Promise<UserResponse> {
    return this.userRepository.findByEmail(email);
  }

  async update(id: string, user: UpdateUserRequest): Promise<UserResponse> {
    const foundUser = await this.userRepository.findById(id);

    if (!foundUser) throw new NotFoundException("User doesn't exist");

    return this.userRepository.update(id, user);
  }
}
