import User from '../../domain/User';
import UsersRepository, {FindUserByEmailOrProviderId} from '../../domain/UsersRepository';

export default function fakeUsersRepository(): UsersRepository {
  const users: User[] = [];

  return {
    getNextUUID(): string {
      return 'fake-uuid';
    },

    async create(user: User): Promise<User> {
      users.push(user);

      return user;
    },

    async findById(id: string): Promise<User | null> {
      const user = users.find(user => user.id === id);

      if (!user) return null;

      return user;
    },

    async findUserByEmailOrProviderId({providersIds, emails}: FindUserByEmailOrProviderId): Promise<User[]> {
      const usersFound = users.filter(
        user =>
          user.emails.some(email => emails.some(e => e.email === email.email)) ||
          user.providersIds.some(providerId => providersIds.some(pi => pi.id === providerId.id)),
      );
      return usersFound;
    },

    async update(updatedUser: User): Promise<User> {
      const findIndex = users.findIndex(findUser => findUser.id === updatedUser.id);

      users[findIndex] = updatedUser;

      return updatedUser;
    },
  };
}
