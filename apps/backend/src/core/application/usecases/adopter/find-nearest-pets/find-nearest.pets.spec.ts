import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { UserService } from '../../../../../user/user.service';
import PostPetForAdoption from '../../owner/post-pet-for-adoption/post-pet-for-adoption';
import FindNearestPets from '../../adopter/find-nearest-pets/find-nearest-pets';
import RequestPetAdoption from '../../adopter/request-pet-adoption/request-pet-adoption';
import { adoptionFactory as petFactory } from '../../../../../../test/factories/adoption';
import { userFactory } from '../../../../../../test/factories/user';
import CancelAdoptionRequest from '../../adopter/cancel-adoption-request/cancel-adoption-request';
import CompleteSignUp from '../../common/complete-sign-up/complete-sign-up';
import { UserType } from '@animavita/types';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  MongoPet,
  PetDocument,
} from '../../../../../infra/mongo/schemas/pet.schema';
import GetMyPets from '../../owner/get-my-pets/get-my-pets';

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
describe.only('FindNearestPets', () => {
  let app: INestApplication;
  let postPetForAdoption: PostPetForAdoption;
  let findNearestPets: FindNearestPets;
  let requestPetAdoption: RequestPetAdoption;
  let cancelAdoptionRequest: CancelAdoptionRequest;
  let completeSignUp: CompleteSignUp;
  let userService: UserService;
  let getMyPets: GetMyPets;
  let petModel: Model<PetDocument>;

  const createOwner = async (user: UserType) => {
    const created = await userService.create(user);
    await completeSignUp.execute(created.id, {
      role: 'owner',
    });
    return created.id;
  };

  const createAdopter = async (user: UserType) => {
    const created = await userService.create(user);
    await completeSignUp.execute(created.id, {
      role: 'adopter',
    });
    return created.id;
  };

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
      providers: [
        UserService,
        PostPetForAdoption,
        FindNearestPets,
        RequestPetAdoption,
        CancelAdoptionRequest,
        CompleteSignUp,
        GetMyPets,
      ],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    postPetForAdoption = fixture.get<PostPetForAdoption>(PostPetForAdoption);
    findNearestPets = fixture.get<FindNearestPets>(FindNearestPets);
    requestPetAdoption = fixture.get<RequestPetAdoption>(RequestPetAdoption);
    cancelAdoptionRequest = fixture.get<CancelAdoptionRequest>(
      CancelAdoptionRequest,
    );
    completeSignUp = fixture.get<CompleteSignUp>(CompleteSignUp);
    getMyPets = fixture.get<GetMyPets>(GetMyPets);
    petModel = fixture.get<Model<PetDocument>>(getModelToken(MongoPet.name));

    await app.init();
  });

  describe('radius search', () => {
    const availablePet1 = petFactory.build();
    const availablePet2 = petFactory.build();
    const availablePet3 = petFactory.build();
    let adopterId: string;

    beforeEach(async () => {
      const owner1Id = await createOwner(owner1);
      const owner2Id = await createOwner(owner2);
      adopterId = await createAdopter(adopter);

      await postPetForAdoption.execute(availablePet1, owner1Id);
      await postPetForAdoption.execute(availablePet2, owner1Id);
      await postPetForAdoption.execute(availablePet3, owner2Id);
    });

    describe("when posted pets are within the adopter's search radius", () => {
      it('returns them in the nearest ones list', async () => {
        const pets = await findNearestPets.execute({
          radius: 2,
          adopterId,
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
          adopterId,
        });

        expect(pets.length).toBe(2);
        expect(pets[0].name).toBe(availablePet1.name);
        expect(pets[1].name).toBe(availablePet2.name);
      });
    });

    describe('when adopter has already requested a pet', () => {
      it('filters out the requested pet from the results', async () => {
        const petsBeforeRequest = await findNearestPets.execute({
          radius: 2,
          adopterId,
        });
        const petToRequest = petsBeforeRequest.find(
          (p) => p.name === availablePet1.name,
        );

        await requestPetAdoption.execute(
          {
            petId: petToRequest.id,
          },
          adopterId,
        );

        const petsAfterRequest = await findNearestPets.execute({
          radius: 2,
          adopterId,
        });

        expect(petsAfterRequest.length).toBe(2);
        expect(
          petsAfterRequest.find((p) => p.name === availablePet1.name),
        ).toBeUndefined();
        expect(petsAfterRequest[0].name).toBe(availablePet2.name);
        expect(petsAfterRequest[1].name).toBe(availablePet3.name);
      });
    });

    describe('when adopter cancelled their request', () => {
      it('does not bring the pet back, since one request per pet is final', async () => {
        const [petToRequest] = await findNearestPets.execute({
          radius: 2,
          adopterId,
        });
        const { id: requestId } = await requestPetAdoption.execute(
          { petId: petToRequest.id },
          adopterId,
        );

        await cancelAdoptionRequest.execute({ requestId }, adopterId);

        const pets = await findNearestPets.execute({ radius: 2, adopterId });

        expect(pets.length).toBe(2);
        expect(pets.find((p) => p.id === petToRequest.id)).toBeUndefined();
      });
    });
  });

  describe('pet status', () => {
    const availablePet = petFactory.build();
    const adoptedPet = petFactory.build();
    const legacyPet = petFactory.build();
    let ownerId: string;
    let adopterId: string;

    beforeEach(async () => {
      ownerId = await createOwner(owner1);
      adopterId = await createAdopter(adopter);

      await postPetForAdoption.execute(availablePet, ownerId);
      const { id: adoptedPetId } = await postPetForAdoption.execute(
        adoptedPet,
        ownerId,
      );
      const { id: legacyPetId } = await postPetForAdoption.execute(
        legacyPet,
        ownerId,
      );

      await petModel.updateOne({ _id: adoptedPetId }, { status: 'adopted' });
      // Pets stored before the status existed have no such field at all
      await petModel.collection.updateOne(
        { _id: new Types.ObjectId(legacyPetId) },
        { $unset: { status: '' } },
      );
    });

    it('posts new pets as available', async () => {
      const pets = await getMyPets.execute(ownerId);

      expect(pets.find((p) => p.name === availablePet.name).status).toBe(
        'available',
      );
    });

    it('leaves adopted pets out of the nearest ones list', async () => {
      const pets = await findNearestPets.execute({ radius: 2, adopterId });

      expect(pets.map((p) => p.name).sort()).toEqual(
        [availablePet.name, legacyPet.name].sort(),
      );
    });

    it('treats pets stored without a status as available', async () => {
      const pets = await findNearestPets.execute({ radius: 2, adopterId });

      expect(pets.find((p) => p.name === legacyPet.name).status).toBe(
        'available',
      );
    });

    it("lists both available and adopted pets in the owner's own list", async () => {
      const pets = await getMyPets.execute(ownerId);

      expect(pets.map((p) => [p.name, p.status]).sort()).toEqual(
        [
          [availablePet.name, 'available'],
          [adoptedPet.name, 'adopted'],
          [legacyPet.name, 'available'],
        ].sort(),
      );
    });
  });

  describe('when no pets have been posted', () => {
    let adopterId: string;

    beforeEach(async () => {
      adopterId = (await userService.create(adopter)).id;
    });

    it('returns an empty list', async () => {
      const pets = await findNearestPets.execute({
        radius: 1,
        adopterId: adopterId,
      });

      expect(pets.length).toEqual(0);
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
