import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { user1Mock, user2Mock } from '../../../../../../test/mocks/adoptions';
import { UserService } from '../../../../../user/user.service';
import PostPetForAdoption from '../post-pet-for-adoption/post-pet-for-adoption';
import RemovePostedPet from './remove-posted-pet';
import { adoptionFactory as petFactory } from '../../../../../../test/factories/adoption';
import CompleteSignUp from '../../common/complete-sign-up/complete-sign-up';
import { UserType } from '@animavita/types';

// integration tests
describe('RemovePostedPet', () => {
  let app: INestApplication;
  let postPetForAdoption: PostPetForAdoption;
  let removePostedPet: RemovePostedPet;
  let completeSignUp: CompleteSignUp;
  let userService: UserService;

  const createOwner = async (user: UserType) => {
    const created = await userService.create(user);
    await completeSignUp.execute(created.id, {
      role: 'owner',
    });
    return created;
  };

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
      providers: [
        UserService,
        PostPetForAdoption,
        RemovePostedPet,
        CompleteSignUp,
      ],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    postPetForAdoption = fixture.get<PostPetForAdoption>(PostPetForAdoption);
    removePostedPet = fixture.get<RemovePostedPet>(RemovePostedPet);
    completeSignUp = fixture.get<CompleteSignUp>(CompleteSignUp);

    await app.init();
  });

  describe('when the user is the pet owner', () => {
    let petId: string;
    let ownerEmail: string;

    beforeEach(async () => {
      const user = await createOwner(user1Mock);
      ownerEmail = user.email;
      const input = petFactory.build();
      const { id } = await postPetForAdoption.execute(input, ownerEmail);
      petId = id;
    });

    it('removes the pet', async () => {
      await removePostedPet.execute({ id: petId }, ownerEmail);

      await expect(
        removePostedPet.execute({ id: petId }, ownerEmail),
      ).rejects.toThrowError('Pet not found');
    });
  });

  describe('when the user is not the pet owner', () => {
    let petId: string;

    beforeEach(async () => {
      const owner1 = await createOwner(user1Mock);

      const input = petFactory.build();
      const { id } = await postPetForAdoption.execute(input, owner1.email);
      petId = id;
    });

    it('throws a unauthorized error', async () => {
      const owner2 = await userService.create(user2Mock);

      await expect(
        removePostedPet.execute({ id: petId }, owner2.email),
      ).rejects.toThrowError("You're not authorized to remove this pet");
    });
  });

  describe('when the pet has not been posted', () => {
    it('throws a not found error', async () => {
      const owner1 = await userService.create(user1Mock);

      await expect(
        removePostedPet.execute(
          { id: '678cf57a89333cd9e22567db' },
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
