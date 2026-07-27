import DenialReason, { DenialReasonType } from './denial-reason';

describe('DenialReason Value Object', () => {
  describe('when input is valid', () => {
    const reasons: DenialReasonType[] = [
      'rejected_by_owner',
      'pet_adopted',
      'pet_removed',
    ];

    it.each(reasons)('creates a %s reason', (reason) => {
      expect(new DenialReason(reason).getValue()).toBe(reason);
    });
  });

  describe('when input is invalid', () => {
    it('throws an error for an unknown reason', () => {
      expect(() => new DenialReason('because_i_said_so')).toThrow(
        'Invalid denial reason: because_i_said_so. Must be one of: rejected_by_owner, pet_adopted, pet_removed',
      );
    });

    it('throws an error for empty string', () => {
      expect(() => new DenialReason('')).toThrow('Invalid denial reason');
    });

    it('rejects a request status used as a reason', () => {
      expect(() => new DenialReason('denied')).toThrow('Invalid denial reason');
    });
  });
});
