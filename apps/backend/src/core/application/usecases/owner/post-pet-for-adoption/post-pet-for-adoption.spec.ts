import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { user1Mock } from '../../../../../../test/mocks/adoptions';
import { UserService } from '../../../../../user/user.service';
import PostPetForAdoption from './post-pet-for-adoption';
import GetPet from '../get-pet/get-pet';

// integration tests
describe('PostPetForAdoption', () => {
  let app: INestApplication;
  let postPetForAdoption: PostPetForAdoption;
  let getPet: GetPet;
  let userService: UserService;
  let ownerEmail: string;

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
      providers: [UserService, PostPetForAdoption, GetPet],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    postPetForAdoption = fixture.get<PostPetForAdoption>(PostPetForAdoption);
    getPet = fixture.get<GetPet>(GetPet);

    await app.init();

    ownerEmail = (await userService.create(user1Mock)).email;
  });

  it('posts pet for adoption', async () => {
    const input = {
      name: 'Mike',
      type: 'dog',
      age: 'adult',
      breed: 'mutt',
      gender: 'male',
      observations: 'very friendly',
      size: 'medium',
      photos: [],
    };

    const { id } = await postPetForAdoption.execute(input, ownerEmail);

    const pet = await getPet.execute(id);

    expect(pet.name).toBe(input.name);
    expect(pet.type).toBe(input.type);
    expect(pet.age).toBe(input.age);
    expect(pet.breed).toBe(input.breed);
    expect(pet.gender).toBe(input.gender);
    expect(pet.size).toBe(input.size);
    expect(pet.observations).toBe(input.observations);
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
