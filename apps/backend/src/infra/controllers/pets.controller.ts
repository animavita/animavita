import { CreateAdoptionRequest } from '@animavita/types';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import PostPetForAdoption from '../../usecases/owner/post-pet-for-adoption/post-pet-for-adoption';

@Controller('api/v1/pets')
export class PetsController {
  constructor(private readonly postPetForAdoption: PostPetForAdoption) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(
    @Body() petData: CreateAdoptionRequest,
    @User() { email }: JwtPayload,
  ) {
    await this.postPetForAdoption.execute(petData, email);
  }
}
