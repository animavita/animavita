import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import * as request from 'supertest';

import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/in-memory-mongo';
import { userMock } from '../mocks/user';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { UserModule } from '../../src/user/user.module';

const setup = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      rootMongooseTestModule(),
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
  it('/POST auth/signUp', async () => {
    const { app } = await setup();

    const { body } = await request(app.getHttpServer())
      .post('/api/v1/auth/signUp')
      .send(userMock)
      .expect(201);

    expect(body).toStrictEqual({
      message: 'User created successfully',
    });

    await app.close();
  });

  it('/POST auth/signIn', async () => {
    const { app, service } = await setup();

    await service.signUp(userMock);

    const { body } = await request(app.getHttpServer())
      .post('/api/v1/auth/signIn')
      .send({
        email: userMock.email,
        password: userMock.password,
      })
      .expect(201);

    expect(body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    );

    await app.close();
  });

  it('/GET auth/logout', async () => {
    const { app, service } = await setup();

    const { accessToken } = await service.signUp(userMock).then(() =>
      service.signIn({
        email: userMock.email,
        password: userMock.password,
      }),
    );

    await request(app.getHttpServer())
      .get('/api/v1/auth/logout')
      .auth(accessToken, { type: 'bearer' })
      .expect(200);

    await app.close();
  });

  it('/GET auth/refresh', async () => {
    const { app, service } = await setup();

    const { accessToken, refreshToken } = await service
      .signUp(userMock)
      .then(() =>
        service.signIn({
          email: userMock.email,
          password: userMock.password,
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

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
