import User from '../../domain/User';
import UsersRepository, {FindUserByEmailOrProviderId, UpdateUser} from '../../domain/UsersRepository';

export default function fakeUsersRepository(): UsersRepository {
  const users: User[] = [];

  return {
    getNextUUID(): string {
      return 'fake-uuid';
    },

    async createUser({id, name, emails, profileImages, providersIds}: User): Promise<User> {
      const newUser = new User({
        id,
        name,
        emails,
        providersIds,
        profileImages,
      });

      users.push(newUser);

      return newUser;
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

    async updateUser({id, proprieties}: UpdateUser): Promise<User> {
      const findIndex = users.findIndex(findUser => findUser.id === id);
      const user = users[findIndex];
      const updatedUser = new User(Object.assign({}, user, proprieties));

      users[findIndex] = updatedUser;

      return updatedUser;
    },
  };
}
