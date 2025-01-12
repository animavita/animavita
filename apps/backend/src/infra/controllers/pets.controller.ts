import { CreateAdoptionRequest } from '@animavita/types';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import PostPetForAdoption from '../../application/usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import FindNearestPets from '../../application/usecases/adopter/find-nearest-pets/find-nearest-pets';

@Controller('api/v1/pets')
export class PetsController {
  constructor(
    private readonly postPetForAdoption: PostPetForAdoption,
    private readonly findNearestPets: FindNearestPets,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(
    @Body() petData: CreateAdoptionRequest,
    @User() { email }: JwtPayload,
  ) {
    await this.postPetForAdoption.execute(petData, email);
  }

  @UseGuards(AccessTokenGuard)
  @Get('nearMe')
  async findNearMe(
    @User() { email }: JwtPayload,
    @Query() { radius }: { radius: number },
  ) {
    return await this.findNearestPets.execute({ radius, adopterEmail: email });
  }
}
