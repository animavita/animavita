import { Exclude } from 'class-transformer';
import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';

export class UserEntity {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  location: {
    longitude: number;
    latitude: number;
  };

  photoUri?: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export abstract class UserRepository extends GenericRepository<
  UserEntity,
  UserEntity
> {
  abstract findByEmail(email: string): Promise<UserEntity>;
}
