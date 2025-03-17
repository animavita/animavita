import { Inject, Injectable } from '@nestjs/common';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';

@Injectable()
export default class GetCurrentUserInfo {
  constructor(
    // TODO: replace with a DAO as getting info from repository for reading purposes might be expensive
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<Output> {
    const user = await this.userRepository.getById(userId);

    return {
      name: user.name,
      location: user.location,
    };
  }
}

export type Output = {
  name: string;
  location?: {
    latitude: number;
    longitude: number;
  };
};
