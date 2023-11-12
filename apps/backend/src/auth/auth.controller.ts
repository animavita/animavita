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

import {
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateUserDTO, UserSignInDTO } from 'src/user/repositories/user.dto';
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

  @ApiTags('Auth')
  @ApiExtraModels(CreateUserDTO)
  @ApiOperation({ summary: 'Sign up user' })
  @ApiOkResponse({ description: 'Created Successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post('signUp')
  @UsePipes(new JoiValidationPipe(signUpValidationSchema))
  async signUp(@Body() user: CreateUserDTO) {
    await this.authService.signUp(user);
    return await this.authService.signIn({
      email: user.email,
      password: user.password,
    });
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiOkResponse({ description: 'User successfully logged in' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signIn')
  @UsePipes(new JoiValidationPipe(signInValidationSchema))
  async signIn(@Body() user: UserSignInDTO) {
    return this.authService.signIn(user);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Logout user' })
  @ApiOkResponse({ description: 'User successfully logout' })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@User() user: JwtPayload) {
    await this.authService.logout(user.sub);

    return {
      message: 'User successfully logout',
    };
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Refresh user' })
  @ApiOkResponse({ description: 'User successfully refresh' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@User() user: RefreshPayload) {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
