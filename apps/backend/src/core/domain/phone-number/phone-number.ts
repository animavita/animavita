import { EntityError } from '../errors/entity.error';

export class UserPhoneNumber {
  private readonly value: string;

  private constructor(number: string) {
    if (!UserPhoneNumber.isValidNumber(number)) {
      throw new EntityError(`Invalid phone number: ${number}`);
    }
    this.value = UserPhoneNumber.sanitize(number);
  }

  static create(number: string): UserPhoneNumber {
    return new UserPhoneNumber(number);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserPhoneNumber): boolean {
    return this.value === other.value;
  }

  private static sanitize(number: string): string {
    return number.replace(/[^\d+]/g, '');
  }

  private static isValidNumber(number: string): boolean {
    if (!number) {
      return false;
    }

    const sanitized = this.sanitize(number);

    return sanitized.length >= 10 && sanitized.length <= 15;
  }
}
