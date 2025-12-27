import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { userFactory } from '../../../../../../test/factories/user';
import { adoptionFactory } from '../../../../../../test/factories/adoption';
import { UserService } from '../../../../../user/user.service';
import RequestPetAdoption from './request-pet-adoption';
import CompleteSignUp from '../../common/complete-sign-up/complete-sign-up';
import PostPetForAdoption from '../../owner/post-pet-for-adoption/post-pet-for-adoption';
import AdoptionRequestRepository, {
  ADOPTION_REQUEST_REPOSITORY,
} from '../../../repositories/adoption-request.repository';

describe('RequestPetAdoption', () => {
  let app: INestApplication;
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
        RequestPetAdoption,
        PostPetForAdoption,
        CompleteSignUp,
      ],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    requestPetAdoption = fixture.get<RequestPetAdoption>(RequestPetAdoption);
    completeSignUp = fixture.get<CompleteSignUp>(CompleteSignUp);
    postPetForAdoption = fixture.get<PostPetForAdoption>(PostPetForAdoption);
    adoptionRequestRepository = fixture.get<AdoptionRequestRepository>(
      ADOPTION_REQUEST_REPOSITORY,
    );

    await app.init();
  });

  describe('when the user is not found', () => {
    it('throws an error', async () => {
      await expect(
        requestPetAdoption.execute({ petId: 'pet-123' }, 'invalid-id'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('when the user is not an adopter', () => {
    it('throws an error', async () => {
      const ownerData = userFactory.build();
      const { id: ownerId } = await userService.create(ownerData);
      await completeSignUp.execute(ownerId, { role: 'owner' });

      await expect(
        requestPetAdoption.execute({ petId: 'pet-123' }, ownerId),
      ).rejects.toThrow('User is not authorized to request pet adoption');
    });
  });

  describe('when the pet does not exist', () => {
    it('throws an error', async () => {
      const adopterData = userFactory.build();
      const { id: adopterId } = await userService.create(adopterData);
      await completeSignUp.execute(adopterId, { role: 'adopter' });

      await expect(
        requestPetAdoption.execute({ petId: 'invalid-pet-id' }, adopterId),
      ).rejects.toThrow('Pet not found');
    });
  });

  describe('when the user already requested this pet', () => {
    it('throws an error', async () => {
      const ownerData = userFactory.build();
      const { id: ownerId } = await userService.create(ownerData);
      await completeSignUp.execute(ownerId, { role: 'owner' });

      const petData = adoptionFactory.build();
      const { id: petId } = await postPetForAdoption.execute(petData, ownerId);

      const adopterData = userFactory.build();
      const { id: adopterId } = await userService.create(adopterData);
      await completeSignUp.execute(adopterId, { role: 'adopter' });

      await requestPetAdoption.execute({ petId }, adopterId);

      await expect(
        requestPetAdoption.execute({ petId }, adopterId),
      ).rejects.toThrow('You have already requested this pet');
    });
  });

  describe('when the request is valid', () => {
    it('creates an adoption request', async () => {
      const ownerData = userFactory.build();
      const { id: ownerId } = await userService.create(ownerData);
      await completeSignUp.execute(ownerId, { role: 'owner' });

      const petData = adoptionFactory.build();
      const { id: petId } = await postPetForAdoption.execute(petData, ownerId);

      const adopterData = userFactory.build();
      const { id: adopterId } = await userService.create(adopterData);
      await completeSignUp.execute(adopterId, { role: 'adopter' });

      const { id } = await requestPetAdoption.execute({ petId }, adopterId);

      expect(id).toBeDefined();

      const request = await adoptionRequestRepository.getById(id);
      expect(request.petId).toBe(petId);
      expect(request.adopterId).toBe(adopterId);
      expect(request.status).toBe('pending');
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
