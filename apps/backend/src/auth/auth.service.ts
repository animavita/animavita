import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { hash, verify } from 'argon2';

import { UserService } from '../user/user.service';
import { CreateUserRequest, CredentialsType } from '@animavita/types';
import {
  TOKEN_SERVICE,
  TokenService,
} from '../core/application/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
  ) {}

  async signUp(user: CreateUserRequest) {
    return this.userService.create({
      ...user,
      password: await hash(user.password),
    });
  }

  async logout(userId: string) {
    await this.userService.update(userId, {
      refreshToken: null,
    });
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<CredentialsType> {
    const user = await this.userService.findById(userId);

    if (!user || !user.refreshToken || !refreshToken)
      throw new ForbiddenException('Access Denied');

    const matches = await verify(user.refreshToken, refreshToken);

    if (!matches) throw new ForbiddenException('Access Denied');

    const newAccessToken = await this.tokenService.generateAccessToken({
      user: { id: user.id, email: user.email },
    });

    const newRefreshToken = await this.tokenService.generateAccessToken({
      user: { id: user.id, email: user.email },
    });

    await this.updateRefreshToken(user.id, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userService.update(userId, {
      refreshToken: await hash(refreshToken),
    });
  }
}
