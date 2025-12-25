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
import SignIn from '../../src/core/application/usecases/common/sign-in/sign-in';
import UserSessionRepository, {
  USER_SESSION_REPOSITORY,
} from '../../src/core/application/repositories/user-session.repository';

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
  const signInUsecase = moduleFixture.get<SignIn>(SignIn);
  const sessionRepository = moduleFixture.get<UserSessionRepository>(
    USER_SESSION_REPOSITORY,
  );

  await app.init();

  return {
    app,
    service,
    signInUsecase,
    sessionRepository,
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
        sessionId: expect.any(String),
        name: 'Grosbilda',
      });

      await app.close();
    });
  });

  describe('/GET auth/logout', () => {
    it('returns a successful message', async () => {
      const { app, service, signInUsecase } = await setup();

      const { accessToken } = await service.signUp(createUserMock).then(() =>
        signInUsecase.execute({
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

    it('deletes session and prevents token refresh after logout', async () => {
      const { app, service, signInUsecase } = await setup();

      const { accessToken, refreshToken, sessionId } = await service
        .signUp(createUserMock)
        .then(() =>
          signInUsecase.execute({
            email: createUserMock.email,
            password: createUserMock.password,
          }),
        );

      await request(app.getHttpServer())
        .get('/api/v1/auth/logout')
        .auth(accessToken, { type: 'bearer' })
        .expect(200);

      await request(app.getHttpServer())
        .get('/api/v1/auth/refresh')
        .auth(refreshToken, { type: 'bearer' })
        .set('session-id', sessionId)
        .expect(403);

      await app.close();
    });
  });

  describe('/GET auth/refresh', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns new tokens and rotates refresh token', async () => {
      const { app, service, signInUsecase } = await setup();

      const { accessToken, refreshToken, sessionId } = await service
        .signUp(createUserMock)
        .then(() =>
          signInUsecase.execute({
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
        .set('session-id', sessionId)
        .expect(200);

      expect(body).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        sessionId: expect.any(String),
      });

      expect(body.accessToken).not.toEqual(accessToken);
      expect(body.refreshToken).not.toEqual(refreshToken);
      expect(body.sessionId).toEqual(sessionId);

      await app.close();
    });

    it('fails without session-id header', async () => {
      const { app, service, signInUsecase } = await setup();

      const { refreshToken } = await service.signUp(createUserMock).then(() =>
        signInUsecase.execute({
          email: createUserMock.email,
          password: createUserMock.password,
        }),
      );

      await request(app.getHttpServer())
        .get('/api/v1/auth/refresh')
        .auth(refreshToken, { type: 'bearer' })
        .expect(422);

      await app.close();
    });

    it('fails with invalid session-id', async () => {
      const { app, service, signInUsecase } = await setup();

      const { refreshToken } = await service.signUp(createUserMock).then(() =>
        signInUsecase.execute({
          email: createUserMock.email,
          password: createUserMock.password,
        }),
      );

      await request(app.getHttpServer())
        .get('/api/v1/auth/refresh')
        .auth(refreshToken, { type: 'bearer' })
        .set('session-id', '507f1f77bcf86cd799439011')
        .expect(403);

      await app.close();
    });

    it('fails with expired/deleted session', async () => {
      const { app, service, signInUsecase, sessionRepository } = await setup();

      const { refreshToken, sessionId } = await service
        .signUp(createUserMock)
        .then(() =>
          signInUsecase.execute({
            email: createUserMock.email,
            password: createUserMock.password,
          }),
        );

      await sessionRepository.delete(sessionId);

      await request(app.getHttpServer())
        .get('/api/v1/auth/refresh')
        .auth(refreshToken, { type: 'bearer' })
        .set('session-id', sessionId)
        .expect(403);

      await app.close();
    });

    it('invalidates session when token reuse is detected', async () => {
      const { app, service, signInUsecase } = await setup();

      const { refreshToken, sessionId } = await service
        .signUp(createUserMock)
        .then(() =>
          signInUsecase.execute({
            email: createUserMock.email,
            password: createUserMock.password,
          }),
        );

      // Attacker steals the refresh token and uses it first (gets new tokens)
      const { body: attackerTokens } = await request(app.getHttpServer())
        .get('/api/v1/auth/refresh')
        .auth(refreshToken, { type: 'bearer' })
        .set('session-id', sessionId)
        .expect(200);

      // Legitimate user tries to use OLD refresh token - triggers reuse detection
      // This should invalidate the entire session
      await request(app.getHttpServer())
        .get('/api/v1/auth/refresh')
        .auth(refreshToken, { type: 'bearer' })
        .set('session-id', sessionId)
        .expect(403);

      // Critical: Attacker's NEW token should now ALSO be invalid (session deleted)
      await request(app.getHttpServer())
        .get('/api/v1/auth/refresh')
        .auth(attackerTokens.refreshToken, { type: 'bearer' })
        .set('session-id', sessionId)
        .expect(403);

      await app.close();
    });
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
