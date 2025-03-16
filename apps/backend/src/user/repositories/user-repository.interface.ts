import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  location?: {
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

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<UserEntity>;

  abstract findAll(): Promise<UserEntity[]>;

  abstract findById(id: string): Promise<UserEntity>;

  abstract create(
    item: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserEntity>;

  abstract update(
    id: string,
    item: Partial<Omit<UserEntity, 'createdAt' | 'updateAt'>>,
  ): Promise<UserEntity>;

  abstract delete(id: string): Promise<UserEntity>;
}
