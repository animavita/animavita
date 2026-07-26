import { AdoptionRequest } from './adoption-request';

describe('AdoptionRequest Entity', () => {
  describe('create', () => {
    it('creates an adoption request with pending status by default', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
      });

      expect(request.petId).toBe('pet-123');
      expect(request.adopterId).toBe('adopter-456');
      expect(request.status).toBe('pending');
    });

    it('creates an adoption request with specified status', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
        status: 'accepted',
      });

      expect(request.status).toBe('accepted');
    });

    it('creates an adoption request with id when provided', () => {
      const request = AdoptionRequest.create({
        id: 'request-789',
        petId: 'pet-123',
        adopterId: 'adopter-456',
      });

      expect(request.id).toBe('request-789');
    });

    it('has no denial reason by default', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
      });

      expect(request.denialReason).toBeNull();
    });

    it('restores the denial reason of a denied request', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
        status: 'denied',
        denialReason: 'pet_adopted',
      });

      expect(request.denialReason).toBe('pet_adopted');
    });
  });

  describe('accept', () => {
    it('changes status to accepted', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
      });

      request.accept();

      expect(request.status).toBe('accepted');
    });
  });

  describe('deny', () => {
    it('changes status to denied', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
      });

      request.deny('rejected_by_owner');

      expect(request.status).toBe('denied');
    });

    it('records why the request was denied', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
      });

      request.deny('rejected_by_owner');

      expect(request.denialReason).toBe('rejected_by_owner');
    });

    it('rejects an unknown denial reason', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
      });

      expect(() => request.deny('changed_my_mind' as never)).toThrow(
        'Invalid denial reason: changed_my_mind',
      );
    });

    it.each(['accepted', 'denied', 'cancelled'])(
      'refuses to deny a request that is already %s',
      (status) => {
        const request = AdoptionRequest.create({
          petId: 'pet-123',
          adopterId: 'adopter-456',
          status,
        });

        expect(() => request.deny('rejected_by_owner')).toThrow(
          `Only pending adoption requests can be denied, this one is ${status}`,
        );
      },
    );

    it('keeps the original denial reason when denied twice', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
        status: 'denied',
        denialReason: 'pet_adopted',
      });

      expect(() => request.deny('rejected_by_owner')).toThrow();
      expect(request.denialReason).toBe('pet_adopted');
    });
  });
});
