import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import {
  TestMongoDataServicesModule,
  closeInMongodConnection,
} from '../utils/in-memory-mongo';
import { AdoptionsModule } from '../../src/adoption/adoption.module';
import { pet1Mock, pet3Mock, user1Mock } from '../../test/mocks/adoptions';
import { AdoptionsService } from '../../src/adoption/adoption.service';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';

describe('AdoptionsController (e2e)', () => {
  let app: INestApplication;
  let adoptionsService: AdoptionsService;
  let authService: AuthService;
  let userId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TestMongoDataServicesModule,
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
    await authService.signIn({
      email: user1Mock.email,
      password: user1Mock.password,
    });

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
