import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { UserService } from '../../../../../user/user.service';
import PostPetForAdoption from '../../owner/post-pet-for-adoption/post-pet-for-adoption';
import FindNearestPets from '../../adopter/find-nearest-pets/find-nearest-pets';
import { adoptionFactory as petFactory } from '../../../../../../test/factories/adoption';
import { userFactory } from '../../../../../../test/factories/user';
import CompleteSignUp from '../../common/complete-sign-up/complete-sign-up';
import { UserType } from '@animavita/types';

const owner1 = userFactory.build({
  location: {
    // times square
    longitude: -73.98911,
    latitude: 40.75783,
  },
});
const adopter = userFactory.build({
  location: {
    // 8th Ave
    longitude: -73.98956,
    latitude: 40.75751,
  },
});
const owner2 = userFactory.build({
  location: {
    // 3d ave
    longitude: -73.97288,
    latitude: 40.75319,
  },
});

// integration tests
describe('FindNearestPets', () => {
  let app: INestApplication;
  let postPetForAdoption: PostPetForAdoption;
  let findNearestPets: FindNearestPets;
  let completeSignUp: CompleteSignUp;
  let userService: UserService;

  const createOwner = async (user: UserType) => {
    const created = await userService.create(user);
    await completeSignUp.execute(created.id, {
      role: 'owner',
    });
  };

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
      providers: [
        UserService,
        PostPetForAdoption,
        FindNearestPets,
        CompleteSignUp,
      ],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    postPetForAdoption = fixture.get<PostPetForAdoption>(PostPetForAdoption);
    findNearestPets = fixture.get<FindNearestPets>(FindNearestPets);
    completeSignUp = fixture.get<CompleteSignUp>(CompleteSignUp);

    await app.init();
  });

  describe('radius search', () => {
    const availablePet1 = petFactory.build();
    const availablePet2 = petFactory.build();
    const availablePet3 = petFactory.build();

    beforeEach(async () => {
      await createOwner(owner1);
      await createOwner(owner2);
      await userService.create(adopter);

      await postPetForAdoption.execute(availablePet1, owner1.email);
      await postPetForAdoption.execute(availablePet2, owner1.email);
      await postPetForAdoption.execute(availablePet3, owner2.email);
    });

    describe("when posted pets are within the adopter's search radius", () => {
      it('returns them in the nearest ones list', async () => {
        const pets = await findNearestPets.execute({
          radius: 2,
          adopterEmail: adopter.email,
        });

        expect(pets.length).toBe(3);
        expect(pets[0].name).toBe(availablePet1.name);
        expect(pets[1].name).toBe(availablePet2.name);
        expect(pets[2].name).toBe(availablePet3.name);
      });
    });

    describe("when posted pets are not within the adopter's search radius", () => {
      it('does not include them in the nearest ones list', async () => {
        const pets = await findNearestPets.execute({
          radius: 1,
          adopterEmail: adopter.email,
        });

        expect(pets.length).toBe(2);
        expect(pets[0].name).toBe(availablePet1.name);
        expect(pets[1].name).toBe(availablePet2.name);
      });
    });
  });

  describe('when no pets have been posted', () => {
    beforeEach(async () => {
      await userService.create(adopter);
    });

    it('returns an empty list', async () => {
      const pets = await findNearestPets.execute({
        radius: 1,
        adopterEmail: adopter.email,
      });

      expect(pets.length).toEqual(0);
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
