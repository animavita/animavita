import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';

import {
  TestMongoDataServicesModule,
  closeInMongodConnection,
} from '../utils/in-memory-mongo';
import { AuthModule } from '../../src/modules/auth.module';
import { UserModule } from '../../src/modules/user.module';
import { PetModule } from '../../src/modules/pet.module';
import { AuthService } from '../../src/auth/auth.service';
import SignIn from '../../src/core/application/usecases/common/sign-in/sign-in';
import CompleteSignUp from '../../src/core/application/usecases/common/complete-sign-up/complete-sign-up';
import PostPetForAdoption from '../../src/core/application/usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import {
  MongoPet,
  PetDocument,
} from '../../src/infra/mongo/schemas/pet.schema';
import { ErrorMapperInterceptor } from '../../src/infra/interceptors/error-mapper.interceptor';
import { userFactory } from '../factories/user';
import { adoptionFactory } from '../factories/adoption';

describe('Pet status (e2e)', () => {
  let app: INestApplication;
  let petModel: Model<PetDocument>;

  // Everyone lives at the same spot, so every posted pet is within range
  const location = { latitude: 40.75783, longitude: -73.98911 };

  const signUp = async (role: 'owner' | 'adopter') => {
    const data = { ...userFactory.build(), location };
    const authService = app.get(AuthService);
    const { id } = await authService.signUp(data);
    await app.get(CompleteSignUp).execute(id, { role });
    const { accessToken } = await app.get(SignIn).execute({
      email: data.email,
      password: data.password,
    });
    return { id, token: accessToken };
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TestMongoDataServicesModule,
        UserModule,
        AuthModule,
        PetModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ErrorMapperInterceptor());
    petModel = moduleFixture.get(getModelToken(MongoPet.name));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });

  it('shows only available pets in the nearby feed, and all of them to their owner', async () => {
    const owner = await signUp('owner');
    const adopter = await signUp('adopter');

    const availablePet = adoptionFactory.build();
    const adoptedPet = adoptionFactory.build();
    const postPet = app.get(PostPetForAdoption);
    await postPet.execute(availablePet, owner.id);
    const { id: adoptedPetId } = await postPet.execute(adoptedPet, owner.id);
    await petModel.updateOne({ _id: adoptedPetId }, { status: 'adopted' });

    const nearby = await request(app.getHttpServer())
      .get('/api/v1/pets/nearMe?radius=2')
      .auth(adopter.token, { type: 'bearer' })
      .expect(200);

    expect(nearby.body.map((p) => p.name)).toEqual([availablePet.name]);

    const mine = await request(app.getHttpServer())
      .get('/api/v1/pets/my')
      .auth(owner.token, { type: 'bearer' })
      .expect(200);

    expect(mine.body.map((p) => [p.name, p.status]).sort()).toEqual(
      [
        [availablePet.name, 'available'],
        [adoptedPet.name, 'adopted'],
      ].sort(),
    );
  });
});
