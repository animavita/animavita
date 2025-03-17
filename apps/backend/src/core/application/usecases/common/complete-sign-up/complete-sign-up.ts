import { Inject, Injectable } from '@nestjs/common';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import { Attributes } from '../../../../domain/user/user';

type Input = {
  location: Attributes['location'];
};

@Injectable()
export default class CompleteSignUp {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, input: Input): Promise<Output> {
    const user = await this.userRepository.getById(userId);
    if (input.location) user.setLocation(input.location);
    await this.userRepository.store(user);

    return {
      location: user.location,
    };
  }
}

export type Output = {
  location?: {
    latitude: number;
    longitude: number;
  };
};
