import { Inject, Injectable } from '@nestjs/common';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import Location from '../../../../domain/location/location';

type Input = {
  location?: {
    latitude: number;
    longitude: number;
  };
  role?: string;
};

@Injectable()
export default class CompleteSignUp {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, input: Input): Promise<Output> {
    const user = await this.userRepository.getById(userId);
    if (input.location) {
      const location = new Location(
        input.location.longitude,
        input.location.latitude,
      );
      user.setLocation(location);
    }
    if (input.role) user.assignRole(input.role);
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
