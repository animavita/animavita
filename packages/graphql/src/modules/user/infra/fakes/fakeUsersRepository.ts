import User from '../../domain/User';
import UsersRepository, {FindUserByEmailOrProviderId} from '../../domain/UsersRepository';

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

    async findUserByEmailOrProviderId({providersIds, emails}: FindUserByEmailOrProviderId): Promise<User.Type | null> {
      const usersFound = users.filter(
        user =>
          user.emails.some(email => emails.some(e => e.email === email.email)) ||
          user.providersIds.some(providerId => providersIds.some(pi => pi.id === providerId.id)),
      );

      return usersFound.length ? usersFound[0] : null;
    },

    async update(updatedUser: User.Type): Promise<User.Type> {
      const findIndex = users.findIndex(findUser => findUser.id === updatedUser.id);

      users[findIndex] = updatedUser;

      return updatedUser;
    },
  };
}
