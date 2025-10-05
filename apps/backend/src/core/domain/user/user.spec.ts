import { faker } from '@faker-js/faker';
import { User } from './user';
import { HasherService } from '../services/hasher.service';
import { Email } from '../email/email';
import Location from '../location/location';

const attributes = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: Email.create(faker.internet.email()),
  password: faker.internet.password(),
  photoUri: faker.internet.avatar(),
  phoneNumber: faker.phone.number(),
  location: new Location(faker.location.longitude(), faker.location.latitude()),
};

describe('User Entity', () => {
  it('creates a valid user object', () => {
    const user = User.create(attributes);

    expect(user.id).toBe(attributes.id);
    expect(user.name).toBe(attributes.name);
    expect(user.email).toBe(attributes.email.getValue());
    expect(user.photoUri).toBe(attributes.photoUri);
    expect(user.phoneNumber).toBe(attributes.phoneNumber);
    expect(user.location).toStrictEqual(attributes.location.getValue());
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
