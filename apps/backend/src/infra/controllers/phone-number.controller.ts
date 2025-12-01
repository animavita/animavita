import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import CompleteSignUp from '../../core/application/usecases/common/complete-sign-up/complete-sign-up';

@Controller('api/v1/phone-number')
export class PhoneNumberController {
  constructor(private readonly completeSignUp: CompleteSignUp) {}

  @Post('send-otp-code')
  @UseGuards(AccessTokenGuard)
  async sendOtpCode(
    @Body() data: { phoneNumber: string },
    @User() { sub }: JwtPayload,
  ) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `Sending OTP code to phone number ${data.phoneNumber} for user ${sub}`,
      );

      return {
        message: 'OTP code sent (simulated in non-production environment)',
      };
    }

    throw new Error('SMS sending not implemented yet');
  }

  @Post('verify-otp-code')
  @UseGuards(AccessTokenGuard)
  async verifyOtpCode(
    @Body() data: { otpCode: string; phoneNumber: string },
    @User() { sub }: JwtPayload,
  ) {
    return await this.completeSignUp.execute(sub, {
      phoneNumber: data.phoneNumber,
    });
  }
}
