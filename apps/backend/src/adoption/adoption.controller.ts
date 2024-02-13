import {
  adoptionValidationSchema,
  createValidationSchema,
} from '@animavita/validation-schemas';
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
  UsePipes,
} from '@nestjs/common';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';

import { JoiValidationPipe } from '../pipes/joi-validation-pipe';
import { AdoptionsService } from './adoption.service';
import { User } from '../decorators/user.decorator';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { JwtPayload } from '../auth/strategies/accessToken.strategy';
import { CreateAdoptionRequest, UpdateAdoptionRequest } from '@animavita/types';
import { AdoptionHook } from '../frameworks/casl/hooks/adoption.hook';
import { AdoptionSubject } from '../frameworks/casl/permissions/adoption.permissions';

@Controller('api/v1/adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async createAdoption(
    @Body(new JoiValidationPipe(createValidationSchema))
    adoption: CreateAdoptionRequest,
    @User() { email }: JwtPayload,
  ) {
    return this.adoptionsService.createAdoption(adoption, email);
  }

  @Patch()
  @UseGuards(AccessTokenGuard, AccessGuard)
  @UsePipes(new JoiValidationPipe(adoptionValidationSchema))
  @UseAbility(Actions.update, AdoptionSubject as any, AdoptionHook)
  async updateAdoption(@Body() adoption: UpdateAdoptionRequest) {
    return this.adoptionsService.updateAdoption(adoption);
  }

  @Get()
  async findAll() {
    return this.adoptionsService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('nearMe')
  async findNearMe(
    @User() { email }: JwtPayload,
    @Query() { radius }: { radius: number },
  ) {
    return this.adoptionsService.findNearMe({
      radius,
      currentUserEmail: email,
    });
  }

  @Delete(':id')
  async deleteAdoption(@Param('id') adoptionId: string) {
    return this.adoptionsService.deleteAdoption(adoptionId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('myPets')
  async myPets(@User() { email }: JwtPayload) {
    return this.adoptionsService.myPets(email);
  }
}
