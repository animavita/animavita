import { faker } from '@faker-js/faker';
import { User } from './user';
import { HasherService } from '../services/hasher.service';

const attributes = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  photoUri: faker.internet.avatar(),
  location: {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  },
};

describe('User Entity', () => {
  it('creates a valid user object', () => {
    const user = User.create(attributes);

    expect(user.id).toBe(attributes.id);
    expect(user.name).toBe(attributes.name);
    expect(user.email).toBe(attributes.email);
    expect(user.photoUri).toBe(attributes.photoUri);
    expect(user.location).toStrictEqual(attributes.location);
  });

  describe('verifyPassword', () => {
    const hasher: HasherService = {
      compare: jest.fn((plainText) => {
        return Promise.resolve(plainText === 'correct-password');
      }),
      encrypt: jest.fn(),
    };

    beforeEach(jest.clearAllMocks);

    it('returns true for a valid password', async () => {
      const user = User.create(attributes);
      const result = await user.verifyPassword('correct-password', hasher);

      expect(hasher.compare).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('returns false for an invalid password', async () => {
      const user = User.create(attributes);
      const result = await user.verifyPassword('wrong-password', hasher);

      expect(hasher.compare).toHaveBeenCalledTimes(1);
      expect(result).toBe(false);
    });
  });
});
