import { faker } from '@faker-js/faker';
import { User } from './user';
import { HasherService } from '../services/hasher.service';
import { Email } from '../email/email';
import Location from '../location/location';
import { UserRole, UserRoles } from '../role/role';
import { UserPhoneNumber } from '../phone-number/phone-number';

const attributes = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: Email.create(faker.internet.email()),
  password: faker.internet.password(),
  photoUri: faker.internet.avatar(),
  phoneNumber: UserPhoneNumber.create('+1234567890'),
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

  describe('assignRole', () => {
    it('assigns a valid role to user without existing role', () => {
      const user = User.create(attributes);
      const role = UserRole.create(UserRoles.Owner);

      user.assignRole(role);

      expect(user.role).toBe(role);
    });

    it('throws error when trying to assign role to user that already has one', () => {
      const roleAttributes = {
        ...attributes,
        role: UserRole.create(UserRoles.Adopter),
      };
      const user = User.create(roleAttributes);
      const newRole = UserRole.create(UserRoles.Owner);

      expect(() => user.assignRole(newRole)).toThrowError(
        'Role can only be assigned once',
      );
    });

    it('throws error when trying to assign admin role', () => {
      const user = User.create(attributes);
      const adminRole = UserRole.create(UserRoles.Admin);

      expect(() => user.assignRole(adminRole)).toThrowError(
        'Cannot assign admin role to user',
      );
    });
  });

  describe('updatePhoneNumber', () => {
    it('updates phone number for user without existing phone number', () => {
      const userWithoutPhone = User.create({
        ...attributes,
        phoneNumber: undefined,
      });
      const phoneNumber = UserPhoneNumber.create('+1987654321');

      userWithoutPhone.updatePhoneNumber(phoneNumber);

      expect(userWithoutPhone.phoneNumber).toBe(phoneNumber);
    });

    it('updates phone number for user with existing phone number', () => {
      const user = User.create(attributes);
      const newPhoneNumber = UserPhoneNumber.create('+1987654321');

      user.updatePhoneNumber(newPhoneNumber);

      expect(user.phoneNumber).toBe(newPhoneNumber);
    });
  });
});
