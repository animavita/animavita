import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { user1Mock } from '../../../../../../test/mocks/adoptions';
import { UserService } from '../../../../../user/user.service';
import SignIn, { Output } from './sign-in';
import { PASSWORD_HASHER } from '../../../../../core/domain/services/hasher.service';
import { Argon2Hasher } from '../../../../../auth/argon2-password-hasher';
import { TOKEN_SERVICE } from '../../../../../core/application/services/token.service';
import { NestJwtTokenService } from '../../../../../auth/nest-jwt-token-service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../../../../../auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../../../../../auth/strategies/refreshToken.strategy';
import { AuthService } from '../../../../../auth/auth.service';

// integration tests
describe('SignIn', () => {
  let app: INestApplication;
  let signIn: SignIn;
  const email = user1Mock.email;
  const password = user1Mock.password;

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [
        TestMongoDataServicesModule,
        JwtModule.register({}),
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      providers: [
        UserService,
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        {
          provide: PASSWORD_HASHER,
          useClass: Argon2Hasher,
        },
        {
          provide: TOKEN_SERVICE,
          useClass: NestJwtTokenService,
        },
        SignIn,
      ],
    }).compile();

    app = fixture.createNestApplication();
    const authService = fixture.get<AuthService>(AuthService);
    signIn = fixture.get<SignIn>(SignIn);

    await app.init();

    await authService.signUp(user1Mock);
  });

  describe('when user provides valid credentials', () => {
    let payload: Output;

    beforeEach(async () => {
      payload = await signIn.execute({ email, password });
    });

    it('returns a access token', () => {
      expect(payload.accessToken).toEqual(expect.any(String));
      expect(payload.accessToken).not.toEqual(payload.refreshToken);
    });

    it('returns a refresh token', () => {
      expect(payload.refreshToken).toEqual(expect.any(String));
      expect(payload.refreshToken).not.toEqual(payload.accessToken);
    });

    it('returns the user name', () => {
      expect(payload.name).toBe(user1Mock.name);
    });
  });

  describe('when user provides an invalid email', () => {
    it('throws an unauthorized error', async () => {
      await expect(
        signIn.execute({ email: 'invalid@email.com', password }),
      ).rejects.toThrowError('Wrong email or password');
    });
  });

  describe('when user provides an invalid password', () => {
    it('throws an unauthorized error', async () => {
      await expect(
        signIn.execute({ email, password: 'invalid' }),
      ).rejects.toThrowError('Wrong email or password');
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
