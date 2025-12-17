import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { user1Mock } from '../../../../../../test/mocks/adoptions';
import { UserService } from '../../../../../user/user.service';
import PostPetForAdoption, {
  PostPetForAdoptionInput,
} from './post-pet-for-adoption';
import GetPet from '../get-pet/get-pet';
import CompleteSignUp from '../../common/complete-sign-up/complete-sign-up';

// integration tests
describe('PostPetForAdoption', () => {
  let app: INestApplication;
  let postPetForAdoption: PostPetForAdoption;
  let getPet: GetPet;
  let completeSignUp: CompleteSignUp;
  let userService: UserService;
  let user: { id: string; email: string };

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
      providers: [UserService, PostPetForAdoption, GetPet, CompleteSignUp],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    postPetForAdoption = fixture.get<PostPetForAdoption>(PostPetForAdoption);
    getPet = fixture.get<GetPet>(GetPet);
    completeSignUp = fixture.get<CompleteSignUp>(CompleteSignUp);

    await app.init();

    user = await userService.create(user1Mock);
  });

  describe('when the user is not found', () => {
    it('throws an error', async () => {
      await expect(
        postPetForAdoption.execute({} as PostPetForAdoptionInput, 'invalid-id'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('when the user is not an owner', () => {
    beforeEach(async () => {
      await completeSignUp.execute(user.id, {
        role: 'adopter',
      });
    });

    it('throws an error', async () => {
      await expect(
        postPetForAdoption.execute({} as PostPetForAdoptionInput, user.id),
      ).rejects.toThrow('User is not authorized to post a pet for adoption');
    });
  });

  describe('when the user is an owner', () => {
    beforeEach(async () => {
      await completeSignUp.execute(user.id, {
        role: 'owner',
      });
    });

    it('posts pet for adoption', async () => {
      const input = {
        name: 'Mike',
        type: 'dog',
        maturity: 'adult',
        breed: 'mutt',
        gender: 'male',
        observations: 'very friendly',
        size: 'medium',
        photos: [],
      };

      const { id } = await postPetForAdoption.execute(input, user.id);

      const pet = await getPet.execute(id);

      expect(pet.name).toBe(input.name);
      expect(pet.type).toBe(input.type);
      expect(pet.maturity).toBe(input.maturity);
      expect(pet.breed).toBe(input.breed);
      expect(pet.gender).toBe(input.gender);
      expect(pet.size).toBe(input.size);
      expect(pet.observations).toBe(input.observations);
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
