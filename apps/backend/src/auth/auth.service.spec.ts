import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { hash } from 'bcrypt';
import * as argon from 'argon2';

import { userMock } from '../../test/mocks/user';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const userServiceMock = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
};

const configServiceMock = {
  get: jest.fn((key) => {
    const values = {
      JWT_ACCESS_SECRET: 'jwt_access_token_super_secret_key',
      JWT_REFRESH_SECRET: 'jwt_refresh_token_super_secret_key',
    };
    return values[key] || null;
  }),
};

const SALT_ROUNDS = 10;

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      providers: [
        AuthService,
        JwtService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Dependencies', () => {
    describe('JwtService', () => {
      it('should be defined', () => expect(jwtService).toBeDefined());
    });
    describe('ConfigService', () => {
      it('should be defined', () => expect(configService).toBeDefined());
    });
    describe('UserService', () => {
      it('should be defined', () => expect(userService).toBeDefined());
    });
  });

  describe('signUp', () => {
    it('should register a new user', async () => {
      jest.spyOn(userService, 'create').mockResolvedValueOnce(userMock);
      await expect(service.signUp(userMock)).resolves.toEqual(userMock);
    });
  });

  describe('signIn', () => {
    it('should generate a pair of tokens if user successfully logged', async () => {
      const user = {
        id: 'someId',
        ...userMock,
        password: await hash(userMock.password, SALT_ROUNDS),
      };
      jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(user);
      const spiedFunction = jest
        .spyOn(userService, 'update')
        .mockResolvedValueOnce(null);

      const tokens = await service.signIn({
        email: userMock.email,
        password: userMock.password,
      });

      expect(tokens).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        }),
      );
      expect(spiedFunction).toBeCalled();
    });

    it('should throw if user not found', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(null);
      await expect(
        service.signIn({
          email: userMock.email,
          password: userMock.password,
        }),
      ).rejects.toThrowError(BadRequestException);
    });

    it('should throw if password do not match', async () => {
      const user = {
        ...userMock,
        password: await hash(userMock.password + 'diff_password', SALT_ROUNDS),
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(user);

      await expect(
        service.signIn({
          email: userMock.email,
          password: userMock.password,
        }),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('logout', () => {
    it('should update users refresh token to null', async () => {
      const spiedFunction = jest.spyOn(userService, 'update');

      await service.logout('someId');

      expect(spiedFunction).toBeCalledWith('someId', {
        refreshToken: null,
      });
    });
  });

  describe('refreshTokens', () => {
    let user;
    let tokens;

    beforeEach(async () => {
      user = {
        id: 'someId',
        ...userMock,
        password: await hash(userMock.password, SALT_ROUNDS),
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(user);
      jest.spyOn(userService, 'update').mockResolvedValueOnce(null);

      tokens = await service.signIn({
        email: userMock.email,
        password: userMock.password,
      });
    });

    it('should generate new pair of tokens', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        ...user,
        refreshToken: await argon.hash(tokens.refreshToken),
      });

      // I need to wait a second because if I don't the tokens will be the same
      await new Promise((r) => setTimeout(r, 1000));

      const newTokens = await service.refreshTokens(
        user.id,
        tokens.refreshToken,
      );

      expect(newTokens).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        }),
      );

      expect(newTokens).not.toEqual(tokens);
    });
    it('should throw if user not found', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValueOnce(null);

      await expect(
        service.refreshTokens(user.id, tokens.refreshToken),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if user has never logged in or has recently logout', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        ...user,
        refreshToken: null,
      });

      await expect(
        service.refreshTokens(user.id, 'some_token'),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if given token is null or undefined', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        ...user,
        refreshToken: await argon.hash(tokens.refreshToken),
      });

      await expect(
        service.refreshTokens(user.id, 'different_token'),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('should throw if given token its not the current', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(user);
      jest.spyOn(userService, 'update').mockResolvedValueOnce(null);

      // I need to wait a second because if I don't the tokens will be the same
      await new Promise((r) => setTimeout(r, 1000));

      const newTokens = await service.signIn({
        email: userMock.email,
        password: userMock.password,
      });

      jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        ...user,
        refreshToken: await argon.hash(tokens.refreshToken),
      });

      await expect(
        service.refreshTokens(user.id, newTokens.refreshToken),
      ).rejects.toThrowError(ForbiddenException);
    });
  });
});
