import User from '../../../domain/User';
export default interface TokenProvider {
  generateToken(userId: string): string;
  getUser(token: string): Promise<User | null>;
}
