import { ForbiddenException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import * as argon from 'argon2';

import { userMock } from '../../test/mocks/user';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { TOKEN_SERVICE } from '../core/application/services/token.service';

jest.mock('argon2', () => ({
  verify: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hash'),
}));

const setup = async () => {
  const persistedUser = {
    id: 'someId',
    refreshToken: 'oldToken',
    ...userMock,
  };

  const userServiceMock = {
    create: jest.fn().mockResolvedValue(persistedUser),
    findById: jest.fn().mockResolvedValue(persistedUser),
    findByEmail: jest.fn().mockResolvedValue(persistedUser),
    update: jest.fn().mockResolvedValue(persistedUser),
  };

  const jwtServiceMock = {
    generateAccessToken: jest
      .fn()
      .mockImplementation(() => Promise.resolve('token')),
    generateRefreshToken: jest
      .fn()
      .mockImplementation(() => Promise.resolve('token')),
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
    it('should update users refresh token to null', async () => {
      const { service, userService } = await setup();

      const userServiceUpdate = jest.spyOn(userService, 'update');

      await service.logout('someId');

      expect(userServiceUpdate).toBeCalledWith('someId', {
        refreshToken: null,
      });
    });
  });

  describe('refreshTokens', () => {
    it('should generate new pair of tokens', async () => {
      const { service, persistedUser } = await setup();

      const newTokens = await service.refreshTokens(
        persistedUser.id,
        'oldToken',
      );

      expect(newTokens).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        }),
      );
    });

    it('should throw if user not found', async () => {
      const { service, userService } = await setup();

      jest.spyOn(userService, 'findById').mockResolvedValueOnce(null);

      await expect(
        service.refreshTokens('someId', 'oldToken'),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if user has never logged in or has recently logout', async () => {
      const { service, userService, persistedUser } = await setup();

      jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        ...persistedUser,
        refreshToken: null,
      });

      await expect(
        service.refreshTokens(persistedUser.id, 'some_token'),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if given token is null or undefined', async () => {
      const { service, persistedUser } = await setup();

      await expect(
        service.refreshTokens(persistedUser.id, null),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if given token its not the current', async () => {
      const { service, persistedUser } = await setup();

      jest.spyOn(argon, 'verify').mockResolvedValueOnce(false);

      await expect(
        service.refreshTokens(persistedUser.id, 'differentToken'),
      ).rejects.toThrowError(ForbiddenException);
    });
  });
});
