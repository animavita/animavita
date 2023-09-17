import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/in-memory-mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionsModule } from '../../src/adoption/adoption.module';
import { AdoptionSchema } from '../../src/adoption/repositories/mongodb/adoption-mongo.schema';
import {
  countrymen,
  pet1Mock,
  pet2Mock,
  pet3Mock,
  user1Mock,
} from '../../test/mocks/adoptions';
import { AdoptionsService } from '../../src/adoption/adoption.service';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { getCoordinatesFromUser } from '../../src/user/user.helpers';

describe('AdoptionsController (e2e)', () => {
  let app: INestApplication;
  let adoptionsService: AdoptionsService;
  let authService: AuthService;

  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Adoption', schema: AdoptionSchema },
        ]),
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
      await adoptionsService.createAdoption(pet1Mock, 'john@email.com');

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

  it('/POST adoptions', () => {
    return request(app.getHttpServer())
      .post('/api/v1/adoptions')
      .auth(authToken, { type: 'bearer' })
      .send(pet2Mock)
      .expect(201)
      .expect((res) =>
        expect(res.body).toEqual({
          ...pet2Mock,
          id: res.body.id,
          location: user1Mock.location,
          user: {
            id: userId,
            name: user1Mock.name,
          },
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
  });

  it('/PATCH adoptions', async () => {
    const { id } = await adoptionsService.createAdoption(
      pet2Mock,
      'john@email.com',
    );

    return request(app.getHttpServer())
      .patch('/api/v1/adoptions')
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
      'john@email.com',
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

  describe('/GET adoptions/nearMe', () => {
    const [user1, user2] = countrymen;

    beforeEach(async () => {
      await authService.signUp(user2);

      await adoptionsService.createAdoption(pet2Mock, user2.email);
      await adoptionsService.createAdoption(pet1Mock, user1.email);
    });

    it('returns all adoptions within a radius of 1km', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/adoptions/nearMe?radius=1')
        .auth(authToken, { type: 'bearer' })
        .expect(200)
        .expect((res) => {
          return expect(res.body).toEqual([
            expect.objectContaining({
              ...pet2Mock,
              location: user2.location,
              user: {
                id: expect.any(String),
                name: user2.name,
              },
            }),
          ]);
        });
    });

    it('does not return adoptions owned by the current user', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/adoptions/nearMe?radius=1')
        .auth(authToken, { type: 'bearer' })
        .expect(200)
        .expect((res) => {
          return expect(res.body).not.toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                ...pet1Mock,
                location: expect.objectContaining({
                  coordinates: getCoordinatesFromUser(user1),
                }),
                user: expect.objectContaining({
                  name: user1.name,
                }),
              }),
            ]),
          );
        });
    });

    it('does not return adoptions out of the radius', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/adoptions/nearMe?radius=0.6')
        .auth(authToken, { type: 'bearer' })
        .expect(200)
        .expect((res) => {
          return expect(res.body).toEqual([]);
        });
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
