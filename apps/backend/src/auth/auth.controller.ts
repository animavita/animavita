import { UserType } from '@animavita/models';
import {
  signInValidationSchema,
  signUpValidationSchema,
} from '@animavita/validation-schemas';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { User } from '../decorators/user.decorator';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { JoiValidationPipe } from '../pipes/joi-validation-pipe';
import { AuthService } from './auth.service';
import { JwtPayload } from './strategies/accessToken.strategy';
import { RefreshPayload } from './strategies/refreshToken.strategy';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @UsePipes(new JoiValidationPipe(signUpValidationSchema))
  async signUp(@Body() user: UserType) {
    await this.authService.signUp(user);
    return {
      message: 'User created successfully',
    };
  }

  @Post('signIn')
  @UsePipes(new JoiValidationPipe(signInValidationSchema))
  async signIn(@Body() user: UserType) {
    return this.authService.signIn(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@User() user: JwtPayload) {
    await this.authService.logout(user.sub);
    return {
      message: 'User successfully logout',
    };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@User() user: RefreshPayload) {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
