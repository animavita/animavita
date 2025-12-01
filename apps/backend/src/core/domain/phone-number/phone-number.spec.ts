import { UserPhoneNumber } from './phone-number';
import { EntityError } from '../errors/entity.error';

describe('UserPhoneNumber Value Object', () => {
  describe('when creating a valid phone number', () => {
    it('creates a UserPhoneNumber object with a valid number', () => {
      const phoneNumber = UserPhoneNumber.create('+1234567890');
      expect(phoneNumber.getValue()).toBe('+1234567890');
    });

    it('creates a UserPhoneNumber object with a 10-digit number', () => {
      const phoneNumber = UserPhoneNumber.create('1234567890');
      expect(phoneNumber.getValue()).toBe('1234567890');
    });

    it('creates a UserPhoneNumber object with a 15-digit number', () => {
      const phoneNumber = UserPhoneNumber.create('+12345678901234');
      expect(phoneNumber.getValue()).toBe('+12345678901234');
    });

    it('sanitizes phone number by removing non-digit characters except plus sign', () => {
      const phoneNumber = UserPhoneNumber.create('+1 (234) 567-8900');
      expect(phoneNumber.getValue()).toBe('+12345678900');
    });
  });

  describe('when creating an invalid phone number', () => {
    it('throws an error for empty string', () => {
      expect(() => UserPhoneNumber.create('')).toThrow(EntityError);
      expect(() => UserPhoneNumber.create('')).toThrow(
        'Invalid phone number: ',
      );
    });

    it('throws an error for a number that is too short', () => {
      expect(() => UserPhoneNumber.create('123456789')).toThrow(EntityError);
      expect(() => UserPhoneNumber.create('123456789')).toThrow(
        'Invalid phone number: 123456789',
      );
    });

    it('throws an error for a number that is too long', () => {
      expect(() => UserPhoneNumber.create('+12345678901234567')).toThrow(
        EntityError,
      );
      expect(() => UserPhoneNumber.create('+12345678901234567')).toThrow(
        'Invalid phone number: +12345678901234567',
      );
    });
  });

  describe('getValue', () => {
    it('returns the sanitized phone number value', () => {
      const phoneNumber = UserPhoneNumber.create('+1 (555) 123-4567');
      expect(phoneNumber.getValue()).toBe('+15551234567');
    });
  });

  describe('equals', () => {
    it('returns true for same phone numbers', () => {
      const phoneNumber1 = UserPhoneNumber.create('+1234567890');
      const phoneNumber2 = UserPhoneNumber.create('+1234567890');

      expect(phoneNumber1.equals(phoneNumber2)).toBe(true);
    });

    it('returns true for phone numbers with different formatting but same digits', () => {
      const phoneNumber1 = UserPhoneNumber.create('+1 (234) 567-8900');
      const phoneNumber2 = UserPhoneNumber.create('+12345678900');

      expect(phoneNumber1.equals(phoneNumber2)).toBe(true);
    });

    it('returns false for different phone numbers', () => {
      const phoneNumber1 = UserPhoneNumber.create('+1234567890');
      const phoneNumber2 = UserPhoneNumber.create('+9876543210');

      expect(phoneNumber1.equals(phoneNumber2)).toBe(false);
    });
  });
});
