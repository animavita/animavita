import { Inject, Injectable } from '@nestjs/common';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import Location from '../../../../domain/location/location';
import { UserRole } from '../../../../domain/role/role';
import { UserPhoneNumber } from '../../../../domain/phone-number/phone-number';

type Input = {
  location?: {
    latitude: number;
    longitude: number;
  };
  role?: string;
  phoneNumber?: string;
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

    if (input.role) {
      const role = UserRole.create(input.role);
      user.assignRole(role);
    }

    // TODO: ignore if feature flag for phone number verification is off
    if (input.phoneNumber) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('OTP code verification not implemented yet');
      }

      user.updatePhoneNumber(UserPhoneNumber.create(input.phoneNumber));
    }

    await this.userRepository.store(user);

    return {
      location: user.location,
      role: user.role ? user.role.getValue() : undefined,
      phoneNumber: user.phoneNumber ? user.phoneNumber.getValue() : undefined,
    };
  }
}

export type Output = {
  location?: {
    latitude: number;
    longitude: number;
  };
  role?: string;
  phoneNumber?: string;
};
