import { UserType } from '@animavita/models';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserRepository } from './entities/user-entities.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('MONGODB') private readonly userRepository: UserRepository,
  ) {}

  async create(user: UserType) {
    const foundUser = await this.userRepository.findByEmail(user.email);

    if (foundUser)
      throw new UnprocessableEntityException('Email already taken');

    return this.userRepository.create(user);
  }

  findById(userId: string) {
    return this.userRepository.findById(userId);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  update(id: string, user: Partial<UserType>) {
    return this.userRepository.update(id, user);
  }
}
