import { UserType } from '@animavita/models';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserRepository } from './repositories/user-repository.interface';
import { UserMap } from './repositories/user.map';

@Injectable()
export class UserService {
  constructor(
    @Inject('MONGODB') private readonly userRepository: UserRepository,
  ) {}

  async create(user: UserType) {
    const foundUser = await this.userRepository.findByEmail(user.email);

    if (foundUser)
      throw new UnprocessableEntityException('Email already taken');

    return this.userRepository.create(UserMap.toSchema(user));
  }

  findById(userId: string) {
    return this.userRepository.findById(userId);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async update(id: string, user: Partial<UserType>) {
    const foundUser = await this.userRepository.findById(id);

    if (!foundUser) throw new NotFoundException("User doesn't exist");

    return this.userRepository.update(id, UserMap.toSchema(user));
  }
}
