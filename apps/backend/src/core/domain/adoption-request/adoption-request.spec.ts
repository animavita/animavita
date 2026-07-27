import { AdoptionRequest } from './adoption-request';
import { AdoptionRequestStatusType } from './status/status';

const TERMINAL_STATUSES: AdoptionRequestStatusType[] = [
  'accepted',
  'denied',
  'cancelled',
];

const aRequest = (status?: AdoptionRequestStatusType) =>
  AdoptionRequest.create({
    petId: 'pet-123',
    adopterId: 'adopter-456',
    status,
  });

describe('AdoptionRequest Entity', () => {
  describe('create', () => {
    it('creates an adoption request with pending status by default', () => {
      const request = aRequest();

      expect(request.petId).toBe('pet-123');
      expect(request.adopterId).toBe('adopter-456');
      expect(request.status).toBe('pending');
    });

    it('creates an adoption request with specified status', () => {
      expect(aRequest('accepted').status).toBe('accepted');
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
      expect(aRequest().denialReason).toBeNull();
    });

    it('restores a denial reason when provided', () => {
      const request = AdoptionRequest.create({
        petId: 'pet-123',
        adopterId: 'adopter-456',
        status: 'denied',
        denialReason: 'pet_adopted',
      });

      expect(request.denialReason).toBe('pet_adopted');
    });

    it('rejects an unknown denial reason', () => {
      expect(() =>
        AdoptionRequest.create({
          petId: 'pet-123',
          adopterId: 'adopter-456',
          status: 'denied',
          denialReason: 'because_i_said_so',
        }),
      ).toThrow('Invalid denial reason');
    });
  });

  describe('accept', () => {
    it('changes status to accepted', () => {
      const request = aRequest();

      request.accept();

      expect(request.status).toBe('accepted');
    });

    it.each(TERMINAL_STATUSES)(
      'is a conflict when the request is already %s',
      (status) => {
        expect(() => aRequest(status).accept()).toThrow(
          `This adoption request is already ${status} and cannot be accepted`,
        );
      },
    );
  });

  describe('deny', () => {
    it('changes status to denied and records the reason', () => {
      const request = aRequest();

      request.deny('rejected_by_owner');

      expect(request.status).toBe('denied');
      expect(request.denialReason).toBe('rejected_by_owner');
    });

    it('records the cascade reason when the pet was adopted by someone else', () => {
      const request = aRequest();

      request.deny('pet_adopted');

      expect(request.denialReason).toBe('pet_adopted');
    });

    it.each(TERMINAL_STATUSES)(
      'is a conflict when the request is already %s',
      (status) => {
        expect(() => aRequest(status).deny('rejected_by_owner')).toThrow(
          `This adoption request is already ${status} and cannot be denied`,
        );
      },
    );

    it('leaves the original reason untouched when denying an already denied request', () => {
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
