import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { hash, verify } from 'argon2';

import { UserService } from '../user/user.service';
import { CreateUserRequest, CredentialsType } from '@animavita/types';
import {
  TOKEN_SERVICE,
  TokenService,
} from '../core/application/services/token.service';
import UserSessionRepository, {
  USER_SESSION_REPOSITORY,
} from '../core/application/repositories/user-session.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
    @Inject(USER_SESSION_REPOSITORY)
    private readonly sessionRepository: UserSessionRepository,
  ) {}

  async signUp(user: CreateUserRequest) {
    return this.userService.create({
      ...user,
      password: await hash(user.password),
    });
  }

  async logout(sessionId: string) {
    if (!sessionId) {
      throw new ForbiddenException('No session ID provided');
    }

    await this.sessionRepository.delete(sessionId);
  }

  async refreshTokens(
    userId: string,
    sessionId: string,
    refreshToken: string,
  ): Promise<CredentialsType> {
    const user = await this.userService.findById(userId);

    if (!user || !refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const userSession = await this.sessionRepository.getById(sessionId);

    if (!userSession) {
      throw new ForbiddenException('Session not found');
    }

    if (userSession.userId !== userId) {
      throw new ForbiddenException('Session mismatch');
    }

    const matches = await verify(userSession.refreshToken, refreshToken);

    if (!matches) {
      await this.sessionRepository.delete(sessionId);
      throw new ForbiddenException(
        'Token reuse detected - session invalidated',
      );
    }

    const newAccessToken = await this.tokenService.generateAccessToken({
      user: { id: user.id, email: user.email, sessionId: userSession.id },
    });

    const newRefreshToken = await this.tokenService.generateRefreshToken({
      user: { id: user.id, email: user.email },
    });

    const hashedRefreshToken = await hash(newRefreshToken);
    userSession.refreshToken = hashedRefreshToken;
    await this.sessionRepository.store(userSession);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      sessionId,
    };
  }
}
