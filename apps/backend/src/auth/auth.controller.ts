import {
  signInValidationSchema,
  signUpValidationSchema,
} from '@animavita/validation-schemas';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { CreateUserRequest, SignInRequest } from '@animavita/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('signUp')
  @UsePipes(new JoiValidationPipe(signUpValidationSchema))
  async signUp(@Body() user: CreateUserRequest) {
    await this.authService.signUp(user);
    return await this.authService.signIn({
      email: user.email,
      password: user.password,
    });
  }

  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({ status: 201, description: 'Successful sign in' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signIn')
  @UsePipes(new JoiValidationPipe(signInValidationSchema))
  async signIn(@Body() user: SignInRequest) {
    return this.authService.signIn(user);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User successfully logout' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@User() user: JwtPayload) {
    await this.authService.logout(user.sub);

    return {
      message: 'User successfully logout',
    };
  }

  @ApiOperation({ summary: 'Refresh user' })
  @ApiResponse({ status: 200, description: 'User successfully logout' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@User() user: RefreshPayload) {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
