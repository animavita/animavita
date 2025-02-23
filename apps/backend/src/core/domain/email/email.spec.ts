import { Email } from './email';

describe('Email Value Object', () => {
  test('creates a valid Email object', () => {
    const email = Email.create('test@example.com');
    expect(email.getValue()).toBe('test@example.com');
  });

  test('throws an error for an invalid email', () => {
    expect(() => Email.create('invalid-email')).toThrow('Invalid email');
    expect(() => Email.create('test@.com')).toThrow('Invalid email');
    expect(() => Email.create('test@com')).toThrow('Invalid email');
    expect(() => Email.create('test@domain.123')).toThrow('Invalid email');
  });

  test('returns the correct email value', () => {
    const email = Email.create('user@example.com');
    expect(email.getValue()).toBe('user@example.com');
  });

  test('compares two Email objects correctly', () => {
    const email1 = Email.create('same@example.com');
    const email2 = Email.create('same@example.com');
    const email3 = Email.create('different@example.com');

    expect(email1.equals(email2)).toBe(true);
    expect(email1.equals(email3)).toBe(false);
  });
});
