import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  TokenService,
} from '../core/application/services/token.service';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class NestJwtTokenService implements TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  decodeToken(token: string) {
    return this.jwtService.decode(token) as AccessTokenPayload;
  }

  async generateAccessToken(payload: AccessTokenPayload) {
    return await this.jwtService.signAsync(
      {
        sub: payload.user.id,
        email: payload.user.email,
        sessionId: payload.user.sessionId,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION',
        ),
      },
    );
  }

  generateRefreshToken(payload: RefreshTokenPayload) {
    return this.jwtService.signAsync(
      {
        sub: payload.user.id,
        email: payload.user.email,
        jti: randomUUID(),
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRATION',
        ),
      },
    );
  }
}
