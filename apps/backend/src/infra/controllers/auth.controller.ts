import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Coordinates,
  CreateUserRequest,
  SignInRequest,
} from '@animavita/types';
import { AuthService } from '../../auth/auth.service';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { RefreshPayload } from '../../auth/strategies/refreshToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import { RefreshTokenGuard } from '../../guards/refreshToken.guard';
import SignIn from '../../core/application/usecases/common/sign-in/sign-in';
import CompleteSignUp from '../../core/application/usecases/common/complete-sign-up/complete-sign-up';
import GetCurrentUserInfo from '../../core/application/usecases/common/get-current-user-info/get-current-user-info';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly signIn: SignIn,
    private readonly getCurrentUserInfo: GetCurrentUserInfo,
    private readonly completeSignUp: CompleteSignUp,
  ) {}

  @Post('signUp')
  async signUp(@Body() user: CreateUserRequest) {
    await this.authService.signUp(user);
    return await this.signIn.execute({
      email: user.email,
      password: user.password,
    });
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  async me(@User() { sub }: JwtPayload) {
    return await this.getCurrentUserInfo.execute(sub);
  }

  @Post('completeSignUp')
  @UseGuards(AccessTokenGuard)
  async completeRegister(
    @Body() data: { location?: Coordinates },
    @User() { sub }: JwtPayload,
  ) {
    return await this.completeSignUp.execute(sub, {
      location: data.location,
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
