import { UserRole, UserRoles } from './role';

describe('UserRole', () => {
  describe('when input is invalid', () => {
    it('throws an error', () => {
      expect(() => UserRole.create('invalid')).toThrowError(
        'Invalid role: invalid',
      );
    });
  });

  describe('when input is valid', () => {
    it('sets the value', () => {
      expect(UserRole.create('admin').getValue()).toEqual('admin');
      expect(UserRole.create('adopter').getValue()).toEqual('adopter');
      expect(UserRole.create('owner').getValue()).toEqual('owner');
    });
  });

  describe('equals', () => {
    it('returns true for same roles', () => {
      const role1 = UserRole.create(UserRoles.Admin);
      const role2 = UserRole.create(UserRoles.Admin);

      expect(role1.equals(role2)).toBe(true);
    });

    it('returns false for different roles', () => {
      const role1 = UserRole.create(UserRoles.Admin);
      const role2 = UserRole.create(UserRoles.Owner);

      expect(role1.equals(role2)).toBe(false);
    });
  });

  describe('role type getters', () => {
    it('returns true for isOwner when role is owner', () => {
      const role = UserRole.create(UserRoles.Owner);
      expect(role.isOwner).toBe(true);
      expect(role.isAdopter).toBe(false);
      expect(role.isAdmin).toBe(false);
    });

    it('returns true for isAdopter when role is adopter', () => {
      const role = UserRole.create(UserRoles.Adopter);
      expect(role.isAdopter).toBe(true);
      expect(role.isOwner).toBe(false);
      expect(role.isAdmin).toBe(false);
    });

    it('returns true for isAdmin when role is admin', () => {
      const role = UserRole.create(UserRoles.Admin);
      expect(role.isAdmin).toBe(true);
      expect(role.isOwner).toBe(false);
      expect(role.isAdopter).toBe(false);
    });
  });
});
