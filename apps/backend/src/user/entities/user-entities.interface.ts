import { UserType } from '@animavita/models';

export interface UserRepository {
  create(user: UserType): Promise<UserType>;
  findById(userId: string): Promise<UserType>;
  findByEmail(email: string): Promise<UserType>;
  update(id: string, user: Partial<UserType>): Promise<UserType>;
}
