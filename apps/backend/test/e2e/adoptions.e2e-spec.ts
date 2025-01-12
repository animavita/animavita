import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import {
  TestMongoDataServicesModule,
  closeInMongodConnection,
} from '../utils/in-memory-mongo';
import { AdoptionsModule } from '../../src/adoption/adoption.module';
import {
  pet1Mock,
  pet2Mock,
  pet3Mock,
  user1Mock,
} from '../../test/mocks/adoptions';
import { AdoptionsService } from '../../src/adoption/adoption.service';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { CaslModule } from 'nest-casl';
import { Roles } from '../../src/frameworks/casl/app.roles';
import { UserHook } from '../../src/frameworks/casl/hooks/user.hook';

describe('AdoptionsController (e2e)', () => {
  let app: INestApplication;
  let adoptionsService: AdoptionsService;
  let authService: AuthService;

  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TestMongoDataServicesModule,
        CaslModule.forRoot({
          superuserRole: Roles.Admin,
          getUserHook: UserHook,
        }),
        AdoptionsModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    adoptionsService = moduleFixture.get<AdoptionsService>(AdoptionsService);
    authService = moduleFixture.get<AuthService>(AuthService);

    await app.init();

    const { id } = await authService.signUp(user1Mock);
    const { accessToken } = await authService.signIn({
      email: user1Mock.email,
      password: user1Mock.password,
    });

    authToken = accessToken;
    userId = id.toString();
  });

  it('/GET adoptions', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/adoptions')
      .expect(200)
      .expect([]);

    const { id, name, breed, gender, observations, photos, age, type, size } =
      await adoptionsService.createAdoption(pet1Mock, user1Mock.email);

    return request(app.getHttpServer())
      .get('/api/v1/adoptions')
      .expect(200)
      .expect((res) => {
        return expect(res.body).toEqual([
          {
            id,
            name,
            breed,
            gender,
            observations,
            photos,
            age,
            type,
            size,
            location: user1Mock.location,
            user: { id: userId, name: 'John' },
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        ]);
      });
  });

  it('/PATCH adoptions', async () => {
    const { id } = await adoptionsService.createAdoption(
      pet2Mock,
      user1Mock.email,
    );

    return request(app.getHttpServer())
      .patch('/api/v1/adoptions')
      .set('Authorization', 'bearer ' + authToken)
      .send({ id, name: 'Marley' })
      .expect(200)
      .expect((res) =>
        expect(res.body).toEqual(
          expect.objectContaining({
            ...pet2Mock,
            id,
            name: 'Marley',
          }),
        ),
      );
  });

  it('/DELETE adoptions', async () => {
    request(app.getHttpServer())
      .get('/api/v1/adoptions')
      .expect(200)
      .expect([]);

    const expectedPet = await adoptionsService.createAdoption(
      pet3Mock,
      user1Mock.email,
    );
    const targetId = expectedPet.id.toString();

    await request(app.getHttpServer())
      .delete(`/api/v1/adoptions/${targetId}`)
      .expect(200);

    return request(app.getHttpServer())
      .get('/api/v1/adoptions')
      .expect(200)
      .expect([]);
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
