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
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';

import { JwtPayload } from '../auth/strategies/accessToken.strategy';
import { User } from '../decorators/user.decorator';
import { AdoptionHook } from '../frameworks/casl/hooks/adoption.hook';
import { AdoptionSubject } from '../frameworks/casl/permissions/adoption.permissions';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { JoiValidationPipe } from '../pipes/joi-validation-pipe';
import { AdoptionsService } from './adoption.service';
import {
  CreateAdoptionDTO,
  UpdateAdoptionDTO,
} from './repositories/adoption.dto';

@Controller('api/v1/adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @ApiTags('Adoptions')
  @ApiExtraModels(CreateAdoptionDTO)
  @ApiOperation({ summary: 'Create a new adoption' })
  @ApiCreatedResponse({ description: 'Created Successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  @UseGuards(AccessTokenGuard)
  async createAdoption(
    @Body(new JoiValidationPipe(createValidationSchema))
    adoption: CreateAdoptionDTO,
    @User() { email }: JwtPayload,
  ) {
    return this.adoptionsService.createAdoption(adoption, email);
  }

  @ApiTags('Adoptions')
  @ApiExtraModels(CreateAdoptionDTO)
  @ApiOperation({ summary: 'Update an existing adoption' })
  @ApiOkResponse({ description: 'Adoption successfully updated' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch()
  @UseGuards(AccessTokenGuard, AccessGuard)
  @UsePipes(new JoiValidationPipe(adoptionValidationSchema))
  @UseAbility(Actions.update, AdoptionSubject as any, AdoptionHook)
  async updateAdoption(@Body() adoption: UpdateAdoptionDTO) {
    return this.adoptionsService.updateAdoption(adoption);
  }

  @ApiTags('Adoptions')
  @ApiOperation({ summary: 'Find all adoptions' })
  @ApiOkResponse({ description: 'Find all successfully' })
  @ApiNotFoundResponse({ description: 'Adoption not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  async findAll() {
    return this.adoptionsService.findAll();
  }

  @ApiTags('Adoptions')
  @ApiOperation({ summary: 'Search near me' })
  @ApiOkResponse({ description: 'Search successfully' })
  @ApiNotFoundResponse({ description: 'Adoption not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
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

  @ApiTags('Adoptions')
  @ApiOperation({ summary: 'Delete adoption' })
  @ApiOkResponse({ description: 'Adoption successfully deleted' })
  @ApiNotFoundResponse({ description: 'Adoption not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  async deleteAdoption(@Param('id') adoptionId: string) {
    return this.adoptionsService.deleteAdoption(adoptionId);
  }
}
