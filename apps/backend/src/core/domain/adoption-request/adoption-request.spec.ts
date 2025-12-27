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

      request.deny();

      expect(request.status).toBe('denied');
    });
  });
});
