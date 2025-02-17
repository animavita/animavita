import { signUpValidationSchema } from '@animavita/validation-schemas';
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
import { AuthService } from '../../auth/auth.service';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { RefreshPayload } from '../../auth/strategies/refreshToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import { RefreshTokenGuard } from '../../guards/refreshToken.guard';
import { JoiValidationPipe } from '../../pipes/joi-validation-pipe';
import SignIn from '../../core/application/usecases/common/sign-in/sign-in';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly signIn: SignIn,
  ) {}

  @Post('signUp')
  @UsePipes(new JoiValidationPipe(signUpValidationSchema))
  async signUp(@Body() user: CreateUserRequest) {
    await this.authService.signUp(user);
    return await this.signIn.execute({
      email: user.email,
      password: user.password,
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signIn')
  async logIn(@Body() user: SignInRequest) {
    return await this.signIn.execute({
      email: user.email,
      password: user.password,
    });
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
