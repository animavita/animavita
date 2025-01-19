import { CreateAdoptionRequest, UpdateAdoptionRequest } from '@animavita/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/accessToken.strategy';
import { User } from '../../decorators/user.decorator';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import PostPetForAdoption from '../../core/application/usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import FindNearestPets from '../../core/application/usecases/adopter/find-nearest-pets/find-nearest-pets';
import UpdatePostedPet from '../../core/application/usecases/owner/update-posted-pet/update-posted-pet';
import RemovePostedPet from '../../core/application/usecases/owner/remove-posted-pet/remove-posted-pet';

@Controller('api/v1/pets')
export class PetsController {
  constructor(
    private readonly postPetForAdoption: PostPetForAdoption,
    private readonly updatePostedPet: UpdatePostedPet,
    private readonly removePostedPet: RemovePostedPet,
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

  @Patch()
  @UseGuards(AccessTokenGuard)
  async updateAdoption(
    @Body() petData: UpdateAdoptionRequest,
    @User() { email }: JwtPayload,
  ) {
    await this.updatePostedPet.execute({ id: petData.id, ...petData }, email);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deletePet(@Param('id') petId: string, @User() { email }: JwtPayload) {
    return this.removePostedPet.execute({ id: petId }, email);
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
