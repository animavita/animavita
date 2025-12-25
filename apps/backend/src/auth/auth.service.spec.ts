import { ForbiddenException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import * as argon from 'argon2';

import { userMock } from '../../test/mocks/user';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { TOKEN_SERVICE } from '../core/application/services/token.service';
import { USER_SESSION_REPOSITORY } from '../core/application/repositories/user-session.repository';
import { UserSession } from '../core/domain/user-session/user-session';

jest.mock('argon2', () => ({
  verify: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hash'),
}));

const setup = async () => {
  const userId = '123'; // Use the same ID as userMock

  const persistedUser = {
    id: userId,
    refreshToken: 'oldToken',
    ...userMock,
  };

  const userServiceMock = {
    create: jest.fn().mockResolvedValue(persistedUser),
    findById: jest.fn().mockResolvedValue(persistedUser),
    findByEmail: jest.fn().mockResolvedValue(persistedUser),
    update: jest.fn().mockResolvedValue(persistedUser),
  };

  const sessionRepositoryMock = {
    getByUserId: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(
          UserSession.create(userId, 'hashedRefreshToken', 'sessionId123'),
        ),
      ),
    getById: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(
          UserSession.create(userId, 'hashedRefreshToken', 'sessionId123'),
        ),
      ),
    store: jest.fn().mockResolvedValue('sessionId123'),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  const jwtServiceMock = {
    generateAccessToken: jest
      .fn()
      .mockImplementation(() => Promise.resolve('newAccessToken')),
    generateRefreshToken: jest
      .fn()
      .mockImplementation(() => Promise.resolve('newRefreshToken')),
  };

  const module: TestingModule = await Test.createTestingModule({
    imports: [JwtModule, ConfigModule],
    providers: [
      AuthService,
      ConfigService,
      {
        provide: TOKEN_SERVICE,
        useValue: jwtServiceMock,
      },
      {
        provide: UserService,
        useValue: userServiceMock,
      },
      {
        provide: USER_SESSION_REPOSITORY,
        useValue: sessionRepositoryMock,
      },
    ],
  }).compile();

  const service = module.get<AuthService>(AuthService);
  const jwtService = module.get<JwtService>(JwtService);
  const configService = module.get<ConfigService>(ConfigService);
  const userService = module.get<UserService>(UserService);

  return {
    persistedUser,
    service,
    jwtService,
    configService,
    userService,
    sessionRepository: sessionRepositoryMock,
  };
};

describe('AuthService', () => {
  it('should be defined', async () => {
    const { service } = await setup();
    expect(service).toBeDefined();
  });

  describe('Dependencies', () => {
    describe('JwtService', () => {
      it('should be defined', async () => {
        const { jwtService } = await setup();
        expect(jwtService).toBeDefined();
      });
    });
    describe('ConfigService', () => {
      it('should be defined', async () => {
        const { configService } = await setup();
        expect(configService).toBeDefined();
      });
    });
    describe('UserService', () => {
      it('should be defined', async () => {
        const { userService } = await setup();
        expect(userService).toBeDefined();
      });
    });
  });

  describe('signUp', () => {
    it('should register a new user', async () => {
      const { service, persistedUser } = await setup();
      await expect(service.signUp(userMock)).resolves.toEqual(persistedUser);
    });
  });

  describe('logout', () => {
    it('should delete user session', async () => {
      const { service, sessionRepository } = await setup();

      await service.logout('sessionId123');

      expect(sessionRepository.delete).toHaveBeenCalledWith('sessionId123');
    });

    it('should throw ForbiddenException if no sessionId provided', async () => {
      const { service } = await setup();

      await expect(service.logout('')).rejects.toThrow(ForbiddenException);
      await expect(service.logout(null)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('refreshTokens', () => {
    it('should generate new pair of tokens and update session', async () => {
      const { service, persistedUser, sessionRepository } = await setup();

      const newTokens = await service.refreshTokens(
        persistedUser.id,
        'sessionId123',
        'oldToken',
      );

      expect(newTokens).toEqual(
        expect.objectContaining({
          accessToken: 'newAccessToken',
          refreshToken: 'newRefreshToken',
          sessionId: 'sessionId123',
        }),
      );
      expect(sessionRepository.store).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: '123',
          id: 'sessionId123',
        }),
      );
    });

    it('should throw if user not found', async () => {
      const { service, userService } = await setup();

      jest.spyOn(userService, 'findById').mockResolvedValueOnce(null);

      await expect(
        service.refreshTokens('someId', 'sessionId123', 'oldToken'),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if session not found', async () => {
      const { service, persistedUser, sessionRepository } = await setup();

      jest.spyOn(sessionRepository, 'getById').mockResolvedValueOnce(null);

      await expect(
        service.refreshTokens(persistedUser.id, 'invalidSession', 'oldToken'),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if session does not belong to user', async () => {
      const { service, persistedUser, sessionRepository } = await setup();

      const otherUserSession = UserSession.create(
        'differentUserId',
        'hash',
        'sessionId123',
      );
      jest
        .spyOn(sessionRepository, 'getById')
        .mockResolvedValueOnce(otherUserSession);

      await expect(
        service.refreshTokens(persistedUser.id, 'sessionId123', 'oldToken'),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if given token is null or undefined', async () => {
      const { service, persistedUser } = await setup();

      await expect(
        service.refreshTokens(persistedUser.id, 'sessionId123', null),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if given token does not match session refresh token', async () => {
      const { service, persistedUser, sessionRepository } = await setup();

      jest.spyOn(argon, 'verify').mockResolvedValueOnce(false);

      await expect(
        service.refreshTokens(persistedUser.id, 'sessionId123', 'wrongToken'),
      ).rejects.toThrowError(ForbiddenException);

      expect(sessionRepository.delete).toHaveBeenCalledWith('sessionId123');
    });
  });
});
