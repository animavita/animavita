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
import GetMyPets from '../../core/application/usecases/owner/get-my-pets/get-my-pets';
import RequestPetAdoption from '../../core/application/usecases/adopter/request-pet-adoption/request-pet-adoption';

@Controller('api/v1/pets')
export class PetsController {
  constructor(
    private readonly postPetForAdoption: PostPetForAdoption,
    private readonly updatePostedPet: UpdatePostedPet,
    private readonly removePostedPet: RemovePostedPet,
    private readonly findNearestPets: FindNearestPets,
    private readonly getMyPets: GetMyPets,
    private readonly requestPetAdoption: RequestPetAdoption,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(
    @Body() petData: CreateAdoptionRequest,
    @User() { sub: userId }: JwtPayload,
  ) {
    await this.postPetForAdoption.execute(petData, userId);
  }

  @Patch()
  @UseGuards(AccessTokenGuard)
  async update(
    @Body() petData: UpdateAdoptionRequest,
    @User() { sub: userId }: JwtPayload,
  ) {
    await this.updatePostedPet.execute({ id: petData.id, ...petData }, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async delete(
    @Param('id') petId: string,
    @User() { sub: userId }: JwtPayload,
  ) {
    return this.removePostedPet.execute({ id: petId }, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/my')
  async myPets(@User() { sub: userId }: JwtPayload) {
    return this.getMyPets.execute(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('nearMe')
  async findNearMe(
    @User() { sub: userId }: JwtPayload,
    @Query() { radius }: { radius: number },
  ) {
    return await this.findNearestPets.execute({ radius, adopterId: userId });
  }

  @Post(':petId/request')
  @UseGuards(AccessTokenGuard)
  async requestAdoption(
    @Param('petId') petId: string,
    @User() { sub: userId }: JwtPayload,
  ) {
    return await this.requestPetAdoption.execute({ petId }, userId);
  }
}
