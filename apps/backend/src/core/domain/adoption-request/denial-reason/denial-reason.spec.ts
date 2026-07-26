import DenialReason from './denial-reason';

describe('DenialReason Value Object', () => {
  describe('when input is valid', () => {
    it('creates a rejected_by_owner reason', () => {
      const reason = new DenialReason('rejected_by_owner');
      expect(reason.getValue()).toBe('rejected_by_owner');
    });

    it('creates a pet_adopted reason', () => {
      const reason = new DenialReason('pet_adopted');
      expect(reason.getValue()).toBe('pet_adopted');
    });

    it('creates a pet_removed reason', () => {
      const reason = new DenialReason('pet_removed');
      expect(reason.getValue()).toBe('pet_removed');
    });
  });

  describe('when input is invalid', () => {
    it('throws an error for an unknown reason', () => {
      expect(() => new DenialReason('because')).toThrow(
        'Invalid denial reason: because. Must be one of: rejected_by_owner, pet_adopted, pet_removed',
      );
    });

    it('throws an error for empty string', () => {
      expect(() => new DenialReason('')).toThrow('Invalid denial reason');
    });
  });
});
