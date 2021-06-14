import User from '../../../domain/User';
import UsersRepository from '../../../domain/UsersRepository';

export default interface TokenProvider {
  generateToken(userId: string): string;
  getUser(token: string): Promise<User | null>;
}
