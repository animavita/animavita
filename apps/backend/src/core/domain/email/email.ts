import { EntityError } from '../errors/entity.error';

export class Email {
  private readonly value: string;

  private constructor(email: string) {
    if (!Email.isValidEmail(email)) {
      throw new EntityError(`Invalid email: ${email}`);
    }
    this.value = email;
  }

  static create(email: string): Email {
    return new Email(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
