import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
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
  authService: AuthService,
  signInUsecase: SignIn,
  completeSignUp: CompleteSignUp,
  postPetForAdoption: PostPetForAdoption,
) => {
  const ownerData = userFactory.build();

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

const placeRequest = async (
  app: INestApplication,
  petId: string,
  adopterToken: string,
) => {
  const { body } = await request(app.getHttpServer())
    .post(`/api/v1/pets/${petId}/request`)
    .auth(adopterToken, { type: 'bearer' })
    .expect(201);

  return body.id as string;
};

const createAdopter = async (
  authService: AuthService,
  signInUsecase: SignIn,
  completeSignUp: CompleteSignUp,
) => {
  const adopterData = userFactory.build();

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

      const { adopterToken: adopterToken2 } = await createAdopter(
        authService,
        signInUsecase,
        completeSignUp,
      );

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
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      );

      const { petId: petId2 } = await createOwnerWithPet(
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

describe('GET /api/v1/adoption-requests/my (e2e)', () => {
  describe('as adopter', () => {
    it('returns placed requests with pet info', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { petId } = await createOwnerWithPet(
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
        .set('Authorization', `Bearer ${adopterToken}`);

      const response = await request(app.getHttpServer())
        .get('/api/v1/adoption-requests/my')
        .set('Authorization', `Bearer ${adopterToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        status: 'pending',
        pet: {
          name: expect.any(String),
          breed: expect.any(String),
          type: expect.any(String),
          owner: {
            id: expect.any(String),
            name: expect.any(String),
          },
        },
        adopter: {
          id: expect.any(String),
          name: expect.any(String),
        },
      });

      await app.close();
    });

    it('returns empty array when no requests placed', async () => {
      const { app, authService, signInUsecase, completeSignUp } = await setup();

      const { adopterToken } = await createAdopter(
        authService,
        signInUsecase,
        completeSignUp,
      );

      const response = await request(app.getHttpServer())
        .get('/api/v1/adoption-requests/my')
        .set('Authorization', `Bearer ${adopterToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);

      await app.close();
    });
  });

  describe('as owner', () => {
    it('returns received requests with pet and adopter info', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { ownerToken, petId } = await createOwnerWithPet(
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
        .set('Authorization', `Bearer ${adopterToken}`);

      const response = await request(app.getHttpServer())
        .get('/api/v1/adoption-requests/my')
        .set('Authorization', `Bearer ${ownerToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        status: 'pending',
        pet: {
          name: expect.any(String),
          breed: expect.any(String),
          type: expect.any(String),
          owner: {
            id: expect.any(String),
            name: expect.any(String),
          },
        },
        adopter: {
          name: expect.any(String),
        },
      });

      await app.close();
    });

    it('returns empty array when no requests received', async () => {
      const {
        app,
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      } = await setup();

      const { ownerToken } = await createOwnerWithPet(
        authService,
        signInUsecase,
        completeSignUp,
        postPetForAdoption,
      );

      const response = await request(app.getHttpServer())
        .get('/api/v1/adoption-requests/my')
        .set('Authorization', `Bearer ${ownerToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);

      await app.close();
    });
  });

  describe('authentication', () => {
    it('fails when not authenticated', async () => {
      const { app } = await setup();

      const response = await request(app.getHttpServer()).get(
        '/api/v1/adoption-requests/my',
      );

      expect(response.status).toBe(401);

      await app.close();
    });
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });
});

describe('PATCH /api/v1/adoption-requests/:id/deny (e2e)', () => {
  it('denies a pending request the owner received', async () => {
    const {
      app,
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    } = await setup();

    const { ownerToken, petId } = await createOwnerWithPet(
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

    const requestId = await placeRequest(app, petId, adopterToken);

    await request(app.getHttpServer())
      .patch(`/api/v1/adoption-requests/${requestId}/deny`)
      .auth(ownerToken, { type: 'bearer' })
      .expect(200);

    const { body } = await request(app.getHttpServer())
      .get('/api/v1/adoption-requests/my')
      .auth(adopterToken, { type: 'bearer' })
      .expect(200);

    expect(body).toEqual([
      expect.objectContaining({
        id: requestId,
        status: 'denied',
        denialReason: 'rejected_by_owner',
      }),
    ]);

    await app.close();
  });

  it('fails as a conflict when the request has already been resolved', async () => {
    const {
      app,
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    } = await setup();

    const { ownerToken, petId } = await createOwnerWithPet(
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

    const requestId = await placeRequest(app, petId, adopterToken);

    await request(app.getHttpServer())
      .patch(`/api/v1/adoption-requests/${requestId}/deny`)
      .auth(ownerToken, { type: 'bearer' })
      .expect(200);

    await request(app.getHttpServer())
      .patch(`/api/v1/adoption-requests/${requestId}/deny`)
      .auth(ownerToken, { type: 'bearer' })
      .expect(409);

    await app.close();
  });

  it('fails when the caller does not own the pet', async () => {
    const {
      app,
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    } = await setup();

    const { petId } = await createOwnerWithPet(
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    );
    const { ownerToken: otherOwnerToken } = await createOwnerWithPet(
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

    const requestId = await placeRequest(app, petId, adopterToken);

    await request(app.getHttpServer())
      .patch(`/api/v1/adoption-requests/${requestId}/deny`)
      .auth(otherOwnerToken, { type: 'bearer' })
      .expect(401);

    const { body } = await request(app.getHttpServer())
      .get('/api/v1/adoption-requests/my')
      .auth(adopterToken, { type: 'bearer' })
      .expect(200);

    expect(body[0]).toMatchObject({ status: 'pending', denialReason: null });

    await app.close();
  });

  it('leaves the other requests for the same pet untouched', async () => {
    const {
      app,
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    } = await setup();

    const { ownerToken, petId } = await createOwnerWithPet(
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    );
    const { adopterToken: firstAdopterToken } = await createAdopter(
      authService,
      signInUsecase,
      completeSignUp,
    );
    const { adopterToken: secondAdopterToken } = await createAdopter(
      authService,
      signInUsecase,
      completeSignUp,
    );

    const deniedRequestId = await placeRequest(app, petId, firstAdopterToken);
    const untouchedRequestId = await placeRequest(
      app,
      petId,
      secondAdopterToken,
    );

    await request(app.getHttpServer())
      .patch(`/api/v1/adoption-requests/${deniedRequestId}/deny`)
      .auth(ownerToken, { type: 'bearer' })
      .expect(200);

    const { body } = await request(app.getHttpServer())
      .get('/api/v1/adoption-requests/my')
      .auth(ownerToken, { type: 'bearer' })
      .expect(200);

    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: deniedRequestId,
          status: 'denied',
          denialReason: 'rejected_by_owner',
        }),
        expect.objectContaining({
          id: untouchedRequestId,
          status: 'pending',
          denialReason: null,
        }),
      ]),
    );

    await app.close();
  });

  it('fails when an adopter tries to deny', async () => {
    const {
      app,
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    } = await setup();

    const { petId } = await createOwnerWithPet(
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

    const requestId = await placeRequest(app, petId, adopterToken);

    await request(app.getHttpServer())
      .patch(`/api/v1/adoption-requests/${requestId}/deny`)
      .auth(adopterToken, { type: 'bearer' })
      .expect(401);

    await app.close();
  });

  it('fails when the request does not exist', async () => {
    const {
      app,
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    } = await setup();

    const { ownerToken } = await createOwnerWithPet(
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    );

    await request(app.getHttpServer())
      .patch('/api/v1/adoption-requests/507f1f77bcf86cd799439011/deny')
      .auth(ownerToken, { type: 'bearer' })
      .expect(404);

    await app.close();
  });

  it('fails when the caller is not authenticated', async () => {
    const {
      app,
      authService,
      signInUsecase,
      completeSignUp,
      postPetForAdoption,
    } = await setup();

    const { petId } = await createOwnerWithPet(
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

    const requestId = await placeRequest(app, petId, adopterToken);

    await request(app.getHttpServer())
      .patch(`/api/v1/adoption-requests/${requestId}/deny`)
      .expect(401);

    await app.close();
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
