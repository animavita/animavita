import User from '../../domain/User';
import UsersRepository, {FindUserByEmailOrProviderId, UpdateUser} from '../../domain/UsersRepository';

export default class FakeUsersRepository implements UsersRepository {
  private users: User[] = [];

  getNextUUID(): string {
    return 'fake-uuid';
  }

  async createUser({id, name, emails, profileImages, providersIds}: User): Promise<User> {
    const newUser = new User({
      id,
      name,
      emails,
      providersIds,
      profileImages,
    });

    this.users.push(newUser);

    return newUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);

    if (!user) return null;

    return user;
  }

  async findUserByEmailOrProviderId({providersIds, emails}: FindUserByEmailOrProviderId): Promise<User[]> {
    const usersFound = this.users.filter(
      user =>
        user.emails.some(email => emails.some(e => e.email === email.email)) ||
        user.providersIds.some(providerId => providersIds.some(pi => pi.id === providerId.id)),
    );
    return usersFound;
  }

  async updateUser({id, proprieties}: UpdateUser): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === id);
    const user = this.users[findIndex];
    const updatedUser = new User(Object.assign({}, user, proprieties));

    this.users[findIndex] = updatedUser;

    return updatedUser;
  }
}
