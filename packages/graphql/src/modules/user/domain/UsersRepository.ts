import User, {Id, Email} from './User';

export interface UpdateUser {
  id: string;
  proprieties: Partial<Omit<User, 'id'>>;
}

export interface FindUserByEmailOrProviderId {
  providersIds: Id[];
  emails: Email[];
}

export default interface UsersRepository {
  getNextUUID(): string;
  createUser(user: User): Promise<User>;
  updateUser(data: UpdateUser): Promise<User>;
  findById(id: string): Promise<User | null>;
  findUserByEmailOrProviderId(data: FindUserByEmailOrProviderId): Promise<User[]>;
}
