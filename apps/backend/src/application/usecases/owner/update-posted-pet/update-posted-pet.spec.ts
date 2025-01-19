import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../test/utils/in-memory-mongo';
import { user1Mock, user2Mock } from '../../../../../test/mocks/adoptions';
import { UserService } from '../../../../user/user.service';
import PostPetForAdoption from '../post-pet-for-adoption/post-pet-for-adoption';
import GetPet from '../get-pet/get-pet';
import UpdatePostedPet from './update-posted-pet';
import { adoptionFactory as petFactory } from '../../../../../test/factories/adoption';

// integration tests
describe('UpdatePostedPet', () => {
  let app: INestApplication;
  let postPetForAdoption: PostPetForAdoption;
  let updatePostedPet: UpdatePostedPet;
  let getPet: GetPet;
  let userService: UserService;

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
      providers: [UserService, PostPetForAdoption, UpdatePostedPet, GetPet],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    postPetForAdoption = fixture.get<PostPetForAdoption>(PostPetForAdoption);
    updatePostedPet = fixture.get<UpdatePostedPet>(UpdatePostedPet);
    getPet = fixture.get<GetPet>(GetPet);

    await app.init();
  });

  describe('when the user is the pet owner', () => {
    let petId: string;
    let ownerEmail: string;

    beforeEach(async () => {
      ownerEmail = (await userService.create(user1Mock)).email;
      const input = petFactory.build();
      const { id } = await postPetForAdoption.execute(input, ownerEmail);
      petId = id;
    });

    it('updates the pet data', async () => {
      await updatePostedPet.execute({ id: petId, name: 'Alf' }, ownerEmail);

      const pet = await getPet.execute(petId);

      expect(pet.name).toBe('Alf');
    });
  });

  describe('when the user is not the pet owner', () => {
    let petId: string;

    beforeEach(async () => {
      const owner1 = await userService.create(user1Mock);

      const input = petFactory.build();
      const { id } = await postPetForAdoption.execute(input, owner1.email);
      petId = id;
    });

    it('throws a unauthorized error', async () => {
      const owner2 = await userService.create(user2Mock);

      await expect(
        updatePostedPet.execute({ id: petId, name: 'Simba' }, owner2.email),
      ).rejects.toThrowError("You're not authorized to update this pet");
    });
  });

  describe('when the pet has not been posted', () => {
    it('throws a not found error', async () => {
      const owner1 = await userService.create(user1Mock);

      await expect(
        updatePostedPet.execute(
          { id: '678cf57a89333cd9e22567db', name: 'Alf' },
          owner1.email,
        ),
      ).rejects.toThrowError('Pet not found');
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
