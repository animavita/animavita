import { AdoptionRepository } from '../../adoption/repositories/adoption-repository.interface';
import { UserRepository } from '../../user/repositories/user-repository.interface';

export abstract class DataServices {
  abstract adoptions: AdoptionRepository;

  abstract users: UserRepository;
}
