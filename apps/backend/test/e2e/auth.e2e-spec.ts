import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import * as request from 'supertest';

import {
  TestMongoDataServicesModule,
  closeInMongodConnection,
} from '../utils/in-memory-mongo';
import { createUserMock } from '../mocks/user';
import { AuthModule } from '../../src/modules/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { UserModule } from '../../src/modules/user.module';

const setup = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TestMongoDataServicesModule,
      UserModule,
      AuthModule,
      ConfigModule.forRoot({ isGlobal: true }),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  const service = moduleFixture.get<AuthService>(AuthService);

  await app.init();

  return {
    app,
    service,
  };
};

const tomorrow = () => {
  const date = new Date();
  return date.setDate(date.getDate() + 1);
};

describe('Authentication (e2e)', () => {
  describe('/POST auth/signUp', () => {
    it('returns a successful message', async () => {
      const { app } = await setup();

      const { body } = await request(app.getHttpServer())
        .post('/api/v1/auth/signUp')
        .send(createUserMock)
        .expect(201);

      expect(body).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        name: 'Grosbilda',
      });

      await app.close();
    });
  });

  describe('/POST auth/signIn', () => {
    it('returns a successful message', async () => {
      const { app, service } = await setup();

      await service.signUp(createUserMock);

      const { body } = await request(app.getHttpServer())
        .post('/api/v1/auth/signIn')
        .send({
          email: createUserMock.email,
          password: createUserMock.password,
        })
        .expect(201);

      expect(body).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        name: 'Grosbilda',
      });

      await app.close();
    });
  });

  describe('/GET auth/logout', () => {
    it('returns a successful message', async () => {
      const { app, service } = await setup();

      const { accessToken } = await service.signUp(createUserMock).then(() =>
        service.signIn({
          email: createUserMock.email,
          password: createUserMock.password,
        }),
      );

      await request(app.getHttpServer())
        .get('/api/v1/auth/logout')
        .auth(accessToken, { type: 'bearer' })
        .expect(200);

      await app.close();
    });
  });

  describe('/GET auth/refresh', () => {
    it('returns a successful message', async () => {
      const { app, service } = await setup();

      const { accessToken, refreshToken } = await service
        .signUp(createUserMock)
        .then(() =>
          service.signIn({
            email: createUserMock.email,
            password: createUserMock.password,
          }),
        );

      jest.useFakeTimers({
        doNotFake: ['nextTick'],
        now: tomorrow(),
      });

      const { body } = await request(app.getHttpServer())
        .get('/api/v1/auth/refresh')
        .auth(refreshToken, { type: 'bearer' })
        .expect(200);

      expect(body).not.toEqual({
        accessToken,
        refreshToken,
      });

      await app.close();
    });
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
