import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import {
  TestMongoDataServicesModule,
  closeInMongodConnection,
} from '../utils/in-memory-mongo';
import { AuthModule } from '../../src/modules/auth.module';
import { UserModule } from '../../src/modules/user.module';
import { PetModule } from '../../src/modules/pet.module';
import { AuthService } from '../../src/auth/auth.service';
import SignIn from '../../src/core/application/usecases/common/sign-in/sign-in';
import { userFactory } from '../factories/user';
import { adoptionFactory } from '../factories/adoption';
import CompleteSignUp from '../../src/core/application/usecases/common/complete-sign-up/complete-sign-up';
import PostPetForAdoption from '../../src/core/application/usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import { ErrorMapperInterceptor } from '../../src/infra/interceptors/error-mapper.interceptor';

const setup = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TestMongoDataServicesModule,
      UserModule,
      AuthModule,
      PetModule,
      ConfigModule.forRoot({ isGlobal: true }),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalInterceptors(new ErrorMapperInterceptor());

  const authService = moduleFixture.get<AuthService>(AuthService);
  const signInUsecase = moduleFixture.get<SignIn>(SignIn);
  const completeSignUp = moduleFixture.get<CompleteSignUp>(CompleteSignUp);
  const postPetForAdoption =
    moduleFixture.get<PostPetForAdoption>(PostPetForAdoption);

  await app.init();

  return {
    app,
    authService,
    signInUsecase,
    completeSignUp,
    postPetForAdoption,
  };
};

const createOwnerWithPet = async (
  app: INestApplication,
  authService: AuthService,
  signInUsecase: SignIn,
  completeSignUp: CompleteSignUp,
  postPetForAdoption: PostPetForAdoption,
) => {
  const ownerData = userFactory.build({
    name: 'Owner User',
    email: 'owner@example.com',
    phoneNumber: '+5551234567890',
    location: { longitude: -47.58849, latitude: -20.90038 },
  });

  const { id: ownerId } = await authService.signUp(ownerData);
  await completeSignUp.execute(ownerId, { role: 'owner' });

  const { accessToken: ownerToken } = await signInUsecase.execute({
    email: ownerData.email,
    password: ownerData.password,
  });

  const petData = adoptionFactory.build();
  const { id: petId } = await postPetForAdoption.execute(petData, ownerId);

  return { ownerId, ownerToken, petId };
};

const createAdopter = async (
  authService: AuthService,
  signInUsecase: SignIn,
  completeSignUp: CompleteSignUp,
) => {
  const adopterData = userFactory.build({
    name: 'Adopter User',
    email: 'adopter@example.com',
    phoneNumber: '+5551987654321',
    location: { longitude: -47.58839, latitude: -20.9064 },
  });

  const { id: adopterId } = await authService.signUp(adopterData);
  await completeSignUp.execute(adopterId, { role: 'adopter' });

  const { accessToken: adopterToken } = await signInUsecase.execute({
    email: adopterData.email,
    password: adopterData.password,
  });

  return { adopterId, adopterToken };
};

describe('Adoption Requests (e2e)', () => {
  describe('POST /api/v1/pets/:petId/request', () => {
    it('allows adopter to request pet adoption', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { petId } = await createOwnerWithPet(
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      );
      const { adopterToken } = await createAdopter(
        authService,
        signInUsecase,
        completeSignUp,
      );

      const { body } = await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId}/request`)
        .auth(adopterToken, { type: 'bearer' })
        .expect(201);

      expect(body).toEqual({
        id: expect.any(String),
      });

      await app.close();
    });

    it('prevents duplicate requests from the same adopter', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { petId } = await createOwnerWithPet(
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      );
      const { adopterToken } = await createAdopter(
        authService,
        signInUsecase,
        completeSignUp,
      );

      await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId}/request`)
        .auth(adopterToken, { type: 'bearer' })
        .expect(201);

      await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId}/request`)
        .auth(adopterToken, { type: 'bearer' })
        .expect(409);

      await app.close();
    });

    it('allows multiple adopters to request the same pet', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { petId } = await createOwnerWithPet(
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      );

      const { adopterToken: adopterToken1 } = await createAdopter(
        authService,
        signInUsecase,
        completeSignUp,
      );

      const adopter2Data = userFactory.build({
        name: 'Adopter User 2',
        email: 'adopter2@example.com',
        phoneNumber: '+5551123456789',
        location: { longitude: -47.58839, latitude: -20.9064 },
      });
      const { id: adopter2Id } = await authService.signUp(adopter2Data);
      await completeSignUp.execute(adopter2Id, { role: 'adopter' });
      const { accessToken: adopterToken2 } = await signInUsecase.execute({
        email: adopter2Data.email,
        password: adopter2Data.password,
      });

      await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId}/request`)
        .auth(adopterToken1, { type: 'bearer' })
        .expect(201);

      await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId}/request`)
        .auth(adopterToken2, { type: 'bearer' })
        .expect(201);

      await app.close();
    });

    it('allows adopter to request multiple different pets', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { petId: petId1 } = await createOwnerWithPet(
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      );

      const ownerData2 = userFactory.build({
        name: 'Owner 2',
        email: 'owner2@example.com',
        phoneNumber: '+5551111111111',
        location: { longitude: -47.58849, latitude: -20.90038 },
      });
      const { id: owner2Id } = await authService.signUp(ownerData2);
      await completeSignUp.execute(owner2Id, { role: 'owner' });
      const pet2Data = adoptionFactory.build();
      const { id: petId2 } = await postPetForAdoption.execute(
        pet2Data,
        owner2Id,
      );

      const { adopterToken } = await createAdopter(
        authService,
        signInUsecase,
        completeSignUp,
      );

      await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId1}/request`)
        .auth(adopterToken, { type: 'bearer' })
        .expect(201);

      await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId2}/request`)
        .auth(adopterToken, { type: 'bearer' })
        .expect(201);

      await app.close();
    });

    it('fails when owner tries to request adoption', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { ownerToken, petId } = await createOwnerWithPet(
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      );

      await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId}/request`)
        .auth(ownerToken, { type: 'bearer' })
        .expect(401);

      await app.close();
    });

    it('fails when pet does not exist', async () => {
      const { app, authService, signInUsecase, completeSignUp } = await setup();

      const { adopterToken } = await createAdopter(
        authService,
        signInUsecase,
        completeSignUp,
      );

      await request(app.getHttpServer())
        .post('/api/v1/pets/507f1f77bcf86cd799439011/request')
        .auth(adopterToken, { type: 'bearer' })
        .expect(404);

      await app.close();
    });

    it('fails when user is not authenticated', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { petId } = await createOwnerWithPet(
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      );

      await request(app.getHttpServer())
        .post(`/api/v1/pets/${petId}/request`)
        .expect(401);

      await app.close();
    });
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
