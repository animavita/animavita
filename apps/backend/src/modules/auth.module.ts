import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AccessTokenStrategy } from '../auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../auth/strategies/refreshToken.strategy';
import { UserModule } from './user.module';
import { AuthController } from '../infra/controllers/auth.controller';
import SignIn from '../core/application/usecases/common/sign-in/sign-in';
import { PASSWORD_HASHER } from '../core/domain/services/hasher.service';
import { Argon2Hasher } from '../auth/argon2-password-hasher';
import { TOKEN_SERVICE } from '../core/application/services/token.service';
import { NestJwtTokenService } from '../auth/nest-jwt-token-service';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [
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
})
export class AuthModule {}
