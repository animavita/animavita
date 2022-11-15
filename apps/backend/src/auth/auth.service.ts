import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '@animavita/models';

import { compare, hash } from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(user: UserType) {
    return this.userService.create({
      ...user,
      password: await hash(user.password, this.SALT_ROUNDS),
    });
  }

  async signIn(user: Pick<UserType, 'email' | 'password'>) {
    const foundUser = await this.userService.findByEmail(user.email);

    if (!foundUser) throw new BadRequestException('Wrong email or password');

    const matches = await compare(user.password, foundUser.password);

    if (!matches) throw new BadRequestException('Wrong email or password');

    const tokens = await this.generateTokens(foundUser.id, user.email);

    await this.updateRefreshToken(foundUser.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.userService.update(userId, {
      refreshToken: null,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);

    if (!user || !refreshToken) throw new ForbiddenException('Access Denied');

    const matches = await compare(refreshToken, user.refreshToken);

    if (!matches) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userService.update(userId, {
      refreshToken: await hash(refreshToken, this.SALT_ROUNDS),
    });
  }

  private async generateTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
