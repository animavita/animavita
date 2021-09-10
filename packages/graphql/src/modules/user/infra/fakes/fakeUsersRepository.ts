import User from '../../domain/User';
import Provider from '../../domain/Provider';
import UsersRepository from '../../domain/UsersRepository';

export default function fakeUsersRepository(): UsersRepository {
  const users: User.Type[] = [];

  return {
    getNextUUID(): string {
      return 'fake-uuid';
    },

    async create(user: User.Type): Promise<User.Type> {
      users.push(user);

      return user;
    },

    async findById(id: string): Promise<User.Type | null> {
      const user = users.find(user => user.id === id);

      if (!user) return null;

      return user;
    },

    async findUserByProvider(providerToFind: Provider.Type): Promise<User.Type | null> {
      const usersFound = users.find(
        user =>
          user.providers.some(provider => provider.id === providerToFind.id) ||
          user.providers.some(provider => provider.email === providerToFind.email),
      );

      return usersFound ?? null;
    },

    async update(updatedUser: User.Type): Promise<User.Type> {
      const findIndex = users.findIndex(findUser => findUser.id === updatedUser.id);

      users[findIndex] = updatedUser;

      return updatedUser;
    },
  };
}
