import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import GetMyAdoptionRequests from '../../core/application/usecases/common/get-my-adoption-requests/get-my-adoption-requests';
import DenyAdoptionRequest from '../../core/application/usecases/owner/deny-adoption-request/deny-adoption-request';

@Controller('api/v1/adoption-requests')
export class AdoptionRequestsController {
  constructor(
    private readonly getMyAdoptionRequests: GetMyAdoptionRequests,
    private readonly denyAdoptionRequest: DenyAdoptionRequest,
  ) {}

  @Get('my')
  @UseGuards(AccessTokenGuard)
  async getMyRequests(@User() { sub: userId }: JwtPayload) {
    return await this.getMyAdoptionRequests.execute(userId);
  }

  @Patch(':id/deny')
  @UseGuards(AccessTokenGuard)
  async deny(
    @Param('id') requestId: string,
    @User() { sub: userId }: JwtPayload,
  ) {
    return await this.denyAdoptionRequest.execute({ requestId }, userId);
  }
}
