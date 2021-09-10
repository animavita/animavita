import Provider from './Provider';
import User from './User';
export default interface UsersRepository {
  getNextUUID(): string;
  create(user: User.Type): Promise<User.Type>;
  update(user: User.Type): Promise<User.Type>;
  findById(id: string): Promise<User.Type | null>;
  findUserByProvider(provider: Provider.Type): Promise<User.Type | null>;
}
