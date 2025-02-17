import { Inject, Injectable } from '@nestjs/common';
import UserRepository, {
  USER_REPOSITORY,
} from '../../../repositories/user.repository';
import {
  PASSWORD_HASHER,
  HasherService,
} from '../../../../domain/services/hasher.service';
import { TOKEN_SERVICE, TokenService } from '../../../services/token.service';
import UserSessionRepository, {
  USER_SESSION_REPOSITORY,
} from '../../../repositories/user-session.repository';
import { UserSession } from '../../../../domain/user-session/user-session';
import { UnauthorizedError } from '../../../../domain/errors/unauthorized.error';

type Input = {
  email: string;
  password: string;
};

@Injectable()
export default class SignIn {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(USER_SESSION_REPOSITORY)
    private readonly userSessionRepository: UserSessionRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: HasherService,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email);

    if (!user) throw new UnauthorizedError('Wrong email or password');

    const isValid = await user.verifyPassword(input.password, this.hasher);

    if (!isValid) throw new UnauthorizedError('Wrong email or password');

    const accessToken = await this.tokenService.generateAccessToken({
      user: { id: user.id, email: user.email },
    });

    const refreshToken = await this.tokenService.generateRefreshToken({
      user: { id: user.id, email: user.email },
    });

    const hashedRefreshToken = await this.hasher.encrypt(refreshToken);
    const userSession = UserSession.create(user.id, hashedRefreshToken);

    await this.userSessionRepository.store(userSession);

    return { accessToken, refreshToken, name: user.name };
  }
}

export type Output = {
  accessToken: string;
  refreshToken: string;
  name: string;
};
