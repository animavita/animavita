import User from './User';
export interface FindUserByEmailOrProviderId {
  providersIds: User.ProviderId[];
  emails: User.Email[];
}
export default interface UsersRepository {
  getNextUUID(): string;
  create(user: User.Type): Promise<User.Type>;
  update(user: User.Type): Promise<User.Type>;
  findById(id: string): Promise<User.Type | null>;
  findUserByEmailOrProviderId(data: FindUserByEmailOrProviderId): Promise<User.Type | null>;
}
