import { UserRepository } from '../../user/repositories/user-repository.interface';

export abstract class DataServices {
  abstract users: UserRepository;
}
