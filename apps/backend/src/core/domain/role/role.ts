import { EntityError } from '../errors/entity.error';

export const UserRoles = {
  Admin: 'admin',
  Adopter: 'adopter',
  Owner: 'owner',
} as const;

export class UserRole {
  private readonly value: string;

  private constructor(role: string) {
    if (!UserRole.isValidRole(role)) {
      throw new EntityError(`Invalid role: ${role}`);
    }
    this.value = role;
  }

  static create(role: string): UserRole {
    return new UserRole(role);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserRole): boolean {
    return this.value === other.value;
  }

  get isOwner() {
    return this.value === UserRoles.Owner;
  }

  get isAdopter() {
    return this.value === UserRoles.Adopter;
  }

  get isAdmin() {
    return this.value === UserRoles.Admin;
  }

  private static isValidRole(role: string): boolean {
    return Object.values(UserRoles).includes(role as any);
  }
}
