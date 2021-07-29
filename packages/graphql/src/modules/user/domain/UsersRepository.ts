import User, {Id, Email} from './User';
export interface FindUserByEmailOrProviderId {
  providersIds: Id[];
  emails: Email[];
}
export default interface UsersRepository {
  getNextUUID(): string;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findUserByEmailOrProviderId(data: FindUserByEmailOrProviderId): Promise<User[]>;
}
