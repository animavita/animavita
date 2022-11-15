import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import * as request from 'supertest';

import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/in-memory-mongo';
import { userMock } from '../mocks/user';
import { AuthModule } from '../../src/auth/auth.module';
import { UserSchema } from '../../src/user/entities/mongodb/user.schema';
import { AuthService } from '../../src/auth/auth.service';

describe('Authentication (e2e)', () => {
  let app: INestApplication;
  let service: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<AuthService>(AuthService);

    await app.init();
  });

  it('/POST auth/signUp', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/api/v1/auth/signUp')
      .send(userMock)
      .expect(201);

    expect(body).toStrictEqual({
      message: 'User created successfully',
    });
  });

  it('/POST auth/signIn', async () => {
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
  });

  it('/GET auth/logout', async () => {
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
  });

  it('/GET auth/refresh', async () => {
    const { accessToken, refreshToken } = await service
      .signUp(userMock)
      .then(() =>
        service.signIn({
          email: userMock.email,
          password: userMock.password,
        }),
      );

    // I need to wait a second because if I don't the tokens will be the same
    await new Promise((r) => setTimeout(r, 1000));

    const { body } = await request(app.getHttpServer())
      .get('/api/v1/auth/refresh')
      .auth(refreshToken, { type: 'bearer' })
      .expect(200);

    expect(body).not.toEqual({
      accessToken,
      refreshToken,
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
