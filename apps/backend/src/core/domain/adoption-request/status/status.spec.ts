import AdoptionRequestStatus from './status';

describe('AdoptionRequestStatus Value Object', () => {
  describe('when input is valid', () => {
    it('creates a pending status', () => {
      const status = new AdoptionRequestStatus('pending');
      expect(status.getValue()).toBe('pending');
    });

    it('creates an accepted status', () => {
      const status = new AdoptionRequestStatus('accepted');
      expect(status.getValue()).toBe('accepted');
    });

    it('creates a denied status', () => {
      const status = new AdoptionRequestStatus('denied');
      expect(status.getValue()).toBe('denied');
    });
  });

  describe('when input is invalid', () => {
    it('throws an error for invalid status', () => {
      expect(() => new AdoptionRequestStatus('invalid')).toThrow(
        'Invalid status: invalid. Must be one of: pending, accepted, denied',
      );
    });

    it('throws an error for empty string', () => {
      expect(() => new AdoptionRequestStatus('')).toThrow('Invalid status');
    });
  });

  describe('factory methods', () => {
    it('creates pending status via factory', () => {
      const status = AdoptionRequestStatus.pending();
      expect(status.getValue()).toBe('pending');
    });

    it('creates accepted status via factory', () => {
      const status = AdoptionRequestStatus.accepted();
      expect(status.getValue()).toBe('accepted');
    });

    it('creates denied status via factory', () => {
      const status = AdoptionRequestStatus.denied();
      expect(status.getValue()).toBe('denied');
    });
  });
});
