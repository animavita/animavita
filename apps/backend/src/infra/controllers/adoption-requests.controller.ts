import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import GetMyAdoptionRequests from '../../core/application/usecases/common/get-my-adoption-requests/get-my-adoption-requests';

@Controller('api/v1/adoption-requests')
export class AdoptionRequestsController {
  constructor(private readonly getMyAdoptionRequests: GetMyAdoptionRequests) {}

  @Get('my')
  @UseGuards(AccessTokenGuard)
  async getMyRequests(@User() { sub: userId }: JwtPayload) {
    return await this.getMyAdoptionRequests.execute(userId);
  }
}
