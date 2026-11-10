import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { userFactory } from '../../../../../../test/factories/user';
import { adoptionFactory } from '../../../../../../test/factories/adoption';
import { UserService } from '../../../../../user/user.service';
import DenyAdoptionRequest from './deny-adoption-request';
import RequestPetAdoption from '../../adopter/request-pet-adoption/request-pet-adoption';
import CompleteSignUp from '../../common/complete-sign-up/complete-sign-up';
import PostPetForAdoption from '../post-pet-for-adoption/post-pet-for-adoption';
import AdoptionRequestRepository, {
  ADOPTION_REQUEST_REPOSITORY,
} from '../../../repositories/adoption-request.repository';

describe('DenyAdoptionRequest', () => {
  let app: INestApplication;
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
        DenyAdoptionRequest,
        RequestPetAdoption,
        PostPetForAdoption,
        CompleteSignUp,
      ],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    denyAdoptionRequest = fixture.get<DenyAdoptionRequest>(DenyAdoptionRequest);
    requestPetAdoption = fixture.get<RequestPetAdoption>(RequestPetAdoption);
    completeSignUp = fixture.get<CompleteSignUp>(CompleteSignUp);
    postPetForAdoption = fixture.get<PostPetForAdoption>(PostPetForAdoption);
    adoptionRequestRepository = fixture.get<AdoptionRequestRepository>(
      ADOPTION_REQUEST_REPOSITORY,
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });

  const createOwner = async () => {
    const ownerData = userFactory.build();
    const { id: ownerId } = await userService.create(ownerData);
    await completeSignUp.execute(ownerId, { role: 'owner' });
    return ownerId;
  };

  const createAdopter = async () => {
    const adopterData = userFactory.build();
    const { id: adopterId } = await userService.create(adopterData);
    await completeSignUp.execute(adopterId, { role: 'adopter' });
    return adopterId;
  };

  const createOwnerWithPet = async () => {
    const ownerId = await createOwner();
    const { id: petId } = await postPetForAdoption.execute(
      adoptionFactory.build(),
      ownerId,
    );
    return { ownerId, petId };
  };

  const createPendingRequest = async () => {
    const { ownerId, petId } = await createOwnerWithPet();
    const adopterId = await createAdopter();
    const { id: requestId } = await requestPetAdoption.execute(
      { petId },
      adopterId,
    );
    return { ownerId, petId, adopterId, requestId };
  };

  describe('when the user is not found', () => {
    it('throws an error', async () => {
      await expect(
        denyAdoptionRequest.execute({ requestId: 'request-123' }, 'invalid-id'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('when the user is not an owner', () => {
    it('throws an error', async () => {
      const adopterId = await createAdopter();

      await expect(
        denyAdoptionRequest.execute({ requestId: 'request-123' }, adopterId),
      ).rejects.toThrow('User is not authorized to deny adoption requests');
    });
  });

  describe('when the request does not exist', () => {
    it('throws an error', async () => {
      const ownerId = await createOwner();

      await expect(
        denyAdoptionRequest.execute(
          { requestId: '507f1f77bcf86cd799439011' },
          ownerId,
        ),
      ).rejects.toThrow('Adoption request not found');
    });
  });

  describe('when the owner does not own the pet', () => {
    it('throws an error', async () => {
      const { requestId } = await createPendingRequest();
      const otherOwnerId = await createOwner();

      await expect(
        denyAdoptionRequest.execute({ requestId }, otherOwnerId),
      ).rejects.toThrow("You're not authorized to deny requests for this pet");
    });

    it('leaves the request pending', async () => {
      const { requestId } = await createPendingRequest();
      const otherOwnerId = await createOwner();

      await expect(
        denyAdoptionRequest.execute({ requestId }, otherOwnerId),
      ).rejects.toThrow();

      const request = await adoptionRequestRepository.getById(requestId);
      expect(request.status).toBe('pending');
    });
  });

  describe('when the request is already resolved', () => {
    it('is a conflict', async () => {
      const { ownerId, requestId } = await createPendingRequest();

      await denyAdoptionRequest.execute({ requestId }, ownerId);

      await expect(
        denyAdoptionRequest.execute({ requestId }, ownerId),
      ).rejects.toThrow('This adoption request is already denied');
    });
  });

  describe('when the request is valid', () => {
    it('denies it with the rejected_by_owner reason', async () => {
      const { ownerId, requestId } = await createPendingRequest();

      await denyAdoptionRequest.execute({ requestId }, ownerId);

      const request = await adoptionRequestRepository.getById(requestId);
      expect(request.status).toBe('denied');
      expect(request.denialReason).toBe('rejected_by_owner');
    });

    it('leaves the other requests for the same pet untouched', async () => {
      const { ownerId, petId } = await createOwnerWithPet();

      const firstAdopterId = await createAdopter();
      const { id: firstRequestId } = await requestPetAdoption.execute(
        { petId },
        firstAdopterId,
      );

      const secondAdopterId = await createAdopter();
      const { id: secondRequestId } = await requestPetAdoption.execute(
        { petId },
        secondAdopterId,
      );

      await denyAdoptionRequest.execute({ requestId: firstRequestId }, ownerId);

      const denied = await adoptionRequestRepository.getById(firstRequestId);
      const untouched = await adoptionRequestRepository.getById(
        secondRequestId,
      );

      expect(denied.status).toBe('denied');
      expect(untouched.status).toBe('pending');
      expect(untouched.denialReason).toBeNull();
    });
  });
});
