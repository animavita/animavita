import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { hash, verify } from 'argon2';

import { UserService } from '../user/user.service';
import {
  CreateUserRequest,
  CredentialsDTO,
  SignInRequest,
  SignInResponse,
} from '@animavita/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(user: CreateUserRequest) {
    return this.userService.create({
      ...user,
      password: await hash(user.password),
    });
  }

  async signIn(user: SignInRequest): Promise<SignInResponse> {
    const foundUser = await this.userService.findByEmail(user.email);

    if (!foundUser) throw new BadRequestException('Wrong email or password');

    const matches = await verify(foundUser.password, user.password);

    if (!matches) throw new BadRequestException('Wrong email or password');

    const tokens = await this.generateTokens(foundUser.id, user.email);

    await this.updateRefreshToken(foundUser.id, tokens.refreshToken);

    const { name } = foundUser;
    return { name, ...tokens };
  }

  async logout(userId: string) {
    await this.userService.update(userId, {
      refreshToken: null,
    });
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<CredentialsDTO> {
    const user = await this.userService.findById(userId);

    if (!user || !user.refreshToken || !refreshToken)
      throw new ForbiddenException('Access Denied');

    const matches = await verify(user.refreshToken, refreshToken);

    if (!matches) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userService.update(userId, {
      refreshToken: await hash(refreshToken),
    });
  }

  private async generateTokens(
    userId: string,
    email: string,
  ): Promise<CredentialsDTO> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
