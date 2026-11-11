import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import GetMyAdoptionRequests from '../../core/application/usecases/common/get-my-adoption-requests/get-my-adoption-requests';
import CancelAdoptionRequest from '../../core/application/usecases/adopter/cancel-adoption-request/cancel-adoption-request';
import DenyAdoptionRequest from '../../core/application/usecases/owner/deny-adoption-request/deny-adoption-request';

@Controller('api/v1/adoption-requests')
export class AdoptionRequestsController {
  constructor(
    private readonly getMyAdoptionRequests: GetMyAdoptionRequests,
    private readonly denyAdoptionRequest: DenyAdoptionRequest,
    private readonly cancelAdoptionRequest: CancelAdoptionRequest,
  ) {}

  @Get('my')
  @UseGuards(AccessTokenGuard)
  async getMyRequests(@User() { sub: userId }: JwtPayload) {
    return await this.getMyAdoptionRequests.execute(userId);
  }

  @Patch(':id/deny')
  @UseGuards(AccessTokenGuard)
  async deny(@Param('id') id: string, @User() { sub: userId }: JwtPayload) {
    return await this.denyAdoptionRequest.execute({ requestId: id }, userId);
  }

  @Patch(':id/cancel')
  @UseGuards(AccessTokenGuard)
  async cancel(@Param('id') id: string, @User() { sub: userId }: JwtPayload) {
    return await this.cancelAdoptionRequest.execute({ requestId: id }, userId);
  }
}
