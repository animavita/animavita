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

    it('creates a cancelled status', () => {
      const status = new AdoptionRequestStatus('cancelled');
      expect(status.getValue()).toBe('cancelled');
    });
  });

  describe('when input is invalid', () => {
    it('throws an error for invalid status', () => {
      expect(() => new AdoptionRequestStatus('invalid')).toThrow(
        'Invalid status: invalid. Must be one of: pending, accepted, denied, cancelled',
      );
    });

    it('throws an error for empty string', () => {
      expect(() => new AdoptionRequestStatus('')).toThrow('Invalid status');
    });
  });

  describe('isPending', () => {
    it('is true for a pending status', () => {
      expect(AdoptionRequestStatus.pending().isPending()).toBe(true);
    });

    it.each(['accepted', 'denied', 'cancelled'])(
      'is false for a %s status',
      (status) => {
        expect(new AdoptionRequestStatus(status).isPending()).toBe(false);
      },
    );
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

    it('creates cancelled status via factory', () => {
      const status = AdoptionRequestStatus.cancelled();
      expect(status.getValue()).toBe('cancelled');
    });
  });
});
