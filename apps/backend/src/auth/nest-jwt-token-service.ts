import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  TokenPayload,
  TokenService,
} from '../core/application/services/token.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestJwtTokenService implements TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  decodeToken(token: string) {
    return this.jwtService.decode(token) as TokenPayload;
  }

  async generateAccessToken(payload: TokenPayload) {
    return await this.jwtService.signAsync(
      {
        sub: payload.user.id,
        email: payload.user.id,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION',
        ),
      },
    );
  }

  generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.signAsync(
      {
        sub: payload.user.id,
        email: payload.user.email,
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
