import { UserType } from '@animavita/models';
import { IUser } from './mongodb/user.interface';

export interface UserRepository {
  create(user: IUser): Promise<UserType>;
  findById(userId: string): Promise<UserType>;
  findByEmail(email: string): Promise<UserType>;
  update(id: string, user: Partial<IUser>): Promise<UserType>;
}
