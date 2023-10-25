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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';

import { CreateAdoptionRequest, UpdateAdoptionRequest } from '@animavita/types';
import { JwtPayload } from '../auth/strategies/accessToken.strategy';
import { User } from '../decorators/user.decorator';
import { AdoptionHook } from '../frameworks/casl/hooks/adoption.hook';
import { AdoptionSubject } from '../frameworks/casl/permissions/adoption.permissions';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { JoiValidationPipe } from '../pipes/joi-validation-pipe';
import { AdoptionsService } from './adoption.service';

@Controller('api/v1/adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @ApiOperation({ summary : 'Create adoption' })
  @ApiResponse({ status: 201, description: 'Adoption successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  @UseGuards(AccessTokenGuard)
  async createAdoption(
    @Body(new JoiValidationPipe(createValidationSchema))
    adoption: CreateAdoptionRequest,
    @User() { email }: JwtPayload,
  ) {
    return this.adoptionsService.createAdoption(adoption, email);
  }

  @ApiOperation({ summary : 'Update adoption' })
  @ApiResponse({ status: 201, description: 'Adoption successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
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

  @ApiOperation({ summary : 'Search near me' })
  @ApiResponse({ status: 201, description: 'Search successfully' })
  @ApiResponse({ status: 404, description: 'Not found' })
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

  @ApiOperation({ summary : 'Delete adoption' })
  @ApiResponse({ status: 201, description: 'Adoption successfully deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Delete(':id')
  async deleteAdoption(@Param('id') adoptionId: string) {
    return this.adoptionsService.deleteAdoption(adoptionId);
  }
}
