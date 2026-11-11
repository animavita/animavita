import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { userFactory } from '../../../../../../test/factories/user';
import { adoptionFactory } from '../../../../../../test/factories/adoption';
import { UserService } from '../../../../../user/user.service';
import CancelAdoptionRequest from './cancel-adoption-request';
import DenyAdoptionRequest from '../../owner/deny-adoption-request/deny-adoption-request';
import RequestPetAdoption from '../request-pet-adoption/request-pet-adoption';
import CompleteSignUp from '../../common/complete-sign-up/complete-sign-up';
import PostPetForAdoption from '../../owner/post-pet-for-adoption/post-pet-for-adoption';
import AdoptionRequestRepository, {
  ADOPTION_REQUEST_REPOSITORY,
} from '../../../repositories/adoption-request.repository';

describe('CancelAdoptionRequest', () => {
  let app: INestApplication;
  let cancelAdoptionRequest: CancelAdoptionRequest;
  let denyAdoptionRequest: DenyAdoptionRequest;
  let requestPetAdoption: RequestPetAdoption;
  let completeSignUp: CompleteSignUp;
  let postPetForAdoption: PostPetForAdoption;
  let userService: UserService;
  let adoptionRequestRepository: AdoptionRequestRepository;

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
      providers: [
        UserService,
        CancelAdoptionRequest,
        DenyAdoptionRequest,
        RequestPetAdoption,
        PostPetForAdoption,
        CompleteSignUp,
      ],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get(UserService);
    cancelAdoptionRequest = fixture.get(CancelAdoptionRequest);
    denyAdoptionRequest = fixture.get(DenyAdoptionRequest);
    requestPetAdoption = fixture.get(RequestPetAdoption);
    completeSignUp = fixture.get(CompleteSignUp);
    postPetForAdoption = fixture.get(PostPetForAdoption);
    adoptionRequestRepository = fixture.get<AdoptionRequestRepository>(
      ADOPTION_REQUEST_REPOSITORY,
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });

  const createUser = async (role: 'owner' | 'adopter') => {
    const { id } = await userService.create(userFactory.build());
    await completeSignUp.execute(id, { role });
    return id;
  };

  const createPendingRequest = async () => {
    const ownerId = await createUser('owner');
    const { id: petId } = await postPetForAdoption.execute(
      adoptionFactory.build(),
      ownerId,
    );
    const adopterId = await createUser('adopter');
    const { id: requestId } = await requestPetAdoption.execute(
      { petId },
      adopterId,
    );
    return { ownerId, petId, adopterId, requestId };
  };

  describe('when the user is not found', () => {
    it('throws an error', async () => {
      await expect(
        cancelAdoptionRequest.execute(
          { requestId: 'request-123' },
          'invalid-id',
        ),
      ).rejects.toThrow('User not found');
    });
  });

  describe('when the user is an owner', () => {
    it('throws an error and leaves the request pending', async () => {
      const { ownerId, requestId } = await createPendingRequest();

      await expect(
        cancelAdoptionRequest.execute({ requestId }, ownerId),
      ).rejects.toThrow('User is not authorized to cancel adoption requests');

      const request = await adoptionRequestRepository.getById(requestId);
      expect(request.status).toBe('pending');
    });
  });

  describe('when the request does not exist', () => {
    it('throws an error', async () => {
      const adopterId = await createUser('adopter');

      await expect(
        cancelAdoptionRequest.execute(
          { requestId: '507f1f77bcf86cd799439011' },
          adopterId,
        ),
      ).rejects.toThrow('Adoption request not found');
    });
  });

  describe("when the request is another adopter's", () => {
    it('throws an error and leaves the request pending', async () => {
      const { requestId } = await createPendingRequest();
      const otherAdopterId = await createUser('adopter');

      await expect(
        cancelAdoptionRequest.execute({ requestId }, otherAdopterId),
      ).rejects.toThrow(
        "You're not authorized to cancel this adoption request",
      );

      const request = await adoptionRequestRepository.getById(requestId);
      expect(request.status).toBe('pending');
    });
  });

  describe('when the request is already resolved', () => {
    it('is a conflict when it was cancelled', async () => {
      const { adopterId, requestId } = await createPendingRequest();

      await cancelAdoptionRequest.execute({ requestId }, adopterId);

      await expect(
        cancelAdoptionRequest.execute({ requestId }, adopterId),
      ).rejects.toThrow('This adoption request is already cancelled');
    });

    it('is a conflict when the owner denied it, and the denial stays', async () => {
      const { ownerId, adopterId, requestId } = await createPendingRequest();

      await denyAdoptionRequest.execute({ requestId }, ownerId);

      await expect(
        cancelAdoptionRequest.execute({ requestId }, adopterId),
      ).rejects.toThrow('This adoption request is already denied');

      const request = await adoptionRequestRepository.getById(requestId);
      expect(request.status).toBe('denied');
      expect(request.denialReason).toBe('rejected_by_owner');
    });
  });

  describe('when the request is valid', () => {
    it('cancels it, with no denial reason', async () => {
      const { adopterId, requestId } = await createPendingRequest();

      await cancelAdoptionRequest.execute({ requestId }, adopterId);

      const request = await adoptionRequestRepository.getById(requestId);
      expect(request.status).toBe('cancelled');
      expect(request.denialReason).toBeNull();
    });
  });
});
