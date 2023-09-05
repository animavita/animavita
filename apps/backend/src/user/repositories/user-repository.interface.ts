import { Exclude } from 'class-transformer';

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

export interface UserRepository {
  create(
    user: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserEntity>;
  findById(userId: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  update(
    id: string,
    user: Partial<Omit<UserEntity, 'createdAt' | 'updateAt'>>,
  ): Promise<UserEntity>;
}
